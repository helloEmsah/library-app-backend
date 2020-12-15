const { users, books } = require("../models");

exports.getUsers = async (req, res) => {
  try {
    const user = await users.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    return res.status(200).send({
      message: "All existing user has been loaded successfully!",
      data: { user },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await users.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });
    if (user) {
      return res.status(200).send({
        message: `User with id ${id} has been loaded successfully`,
        data: user,
      });
    } else {
      return res.status(404).send({
        message: "User didn't exist",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

exports.getUserBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await books.findAll({
      include: [
        {
          model: users,
          as: "user",
          attributes: {
            exclude: [
              "password",
              "gender",
              "picture",
              "phone",
              "address",
              "createdAt",
              "updatedAt",
            ],
          },
        },
      ],

      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
      where: {
        userId: id,
      },
    });

    return res.status(200).send({
      message: `Literature belongs to user id ${id} has been loaded successfully`,
      data: { book },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await users.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (user) {
      const deleteUser = await users.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).send({
        message: "User with corresponding id has been deleted",
        data: {
          id: req.params.id,
        },
      });
    } else {
      return res.status(404).send({
        message: "User didn't exist",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

// exports.uploadProfileImg = async (req, res) => {
//   try {
//     const user = await User.findOne({
//       where: {
//         id: req.user.id,
//       },
//     });

//     if (!user) {
//       res.status(404).send({ error: { message: "User not found" } });
//     }
//     const updateProfile = await User.update(
//       {
//         profile: req.file.filename,
//       },
//       {
//         where: {
//           id,
//         },
//       }
//     );

//     if (!updateProfile)
//       return res.status(400).send({
//         message: "Please try again",
//       });

//     const userResult = await User.findOne({
//       where: {
//         id,
//       },

//       attributes: {
//         exclude: ["createdAt", "updatedAt"],
//       },
//     });

//     res.send({
//       message: "Successfully Upload Profile Image",
//       data: userResult,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       error: {
//         message: "Internal Server Error",
//       },
//     });
//   }
// };

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const [userUpdated] = await users.update(
      {
        ...req.body,
        picture: req.file.filename,
      },
      {
        where: {
          id,
        },
      }
    );

    if (!userUpdated) {
      return res.status(404).send({
        message: "User didn't exist",
      });
    }

    const data = await users.findOne({
      where: {
        id,
      },

      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });
    res.send({
      message: "User has been updated",
      data: {
        data,
        path: req.file.path,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: {
        message: "Internal Server Error",
      },
    });
  }
};
