const { libraries, books, users, categories } = require("../models");

exports.getLibrary = async (req, res) => {
  try {
    const { id } = req.params;
    const library = await libraries.findAll({
      where: {
        userId: id,
      },
      include: [
        {
          model: books,
          as: "book",
          attributes: {
            exclude: ["userId", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: users,
              as: "user",
              attributes: {
                exclude: ["id", "literatureId", "createdAt", "updatedAt"],
              },
            },
          ],
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "literatureId"],
      },
    });

    res.send({
      message: `User id ${id} collection has been loaded successfully!`,
      data: { library },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

// exports.addLibrary = async (req, res) => {
//   try {
//     const library = await Library.create({ ...req.body, userId: req.user.id });

//     return res.status(200).send({
//       message: "Library added successfully",
//       data: { library },
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

exports.addLibrary = async (req, res) => {
  try {
    const { id } = req.user;

    //check if books already in library
    const check = await libraries.findOne({
      where: {
        userId: req.user.id,
        bookId: req.body.bookId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    //if already then
    if (check) {
      return res.status(400).send({
        error: {
          message: "Book has already been added to library",
        },
      });
    }

    //if not in library
    await libraries.create({
      userId: req.user.id,
      bookId: req.body.bookId,
    });
    res.send({
      message: "Your Book has been added successfully",
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

exports.deleteLibrary = async (req, res) => {
  try {
    //const { id } = req.user;
    await libraries.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send({
      message: "Your Literature has been successfully removed from library",
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
