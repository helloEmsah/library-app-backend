const { books, categories, users } = require("../models");

const joi = require("@hapi/joi");

exports.getBooks = async (req, res) => {
  try {
    const book = await books.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: categories,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: users,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "gender",
              "picture",
              "role",
              "password",
            ],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    return res.status(200).send({
      message: "All existing book has been loaded",
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

exports.getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await books.findOne({
      include: [
        {
          model: categories,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: users,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "gender",
              "picture",
              "role",
              "password",
            ],
          },
        },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "userId",
          "UserId",
          "categoryId",
          "CategoryId",
        ],
      },
      where: {
        id: req.params.id,
      },
    });
    if (book) {
      return res.status(200).send({
        message: "Book has been loaded",
        data: { book },
      });
    } else {
      return res.status(404).send({
        message: "Book didn't exist",
      });
    }
  } catch (error) {
    return res.status(500).send({
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

// exports.addBook = async (req, res) => {
//   try {
//     const {
//       title,
//       author,
//       publication,
//       categoryId,
//       userId,
//       page,
//       isbn,
//       about,
//       file,
//       thumbnail,
//     } = req.body;

//     // const schema = joi.object({
//     //   title: joi.string().min(3).required(),
//     //   author: joi.string().min(3).required(),
//     //   publication: joi.string().min(3).required(),
//     //   categoryId: joi.required(),
//     //   page: joi.number(),
//     //   isbn: joi.number(),
//     //   about: joi.string().required(),
//     // });
//     // const { error } = schema.validate(req.body);
//     // if (error) {
//     //   return res.status(400).send({
//     //     error: {
//     //       message: error.details[0].message,
//     //     },
//     //   });
//     // }

//     const book = await Book.create({
//       ...req.body,
//       categoryId,
//       userId,
//     });

//     if (book) {
//       const bookResult = await Book.findOne({
//         where: {
//           id: book.id,
//         },
//         include: [
//           {
//             model: Category,
//             as: "category",
//             attributes: {
//               exclude: ["createdAt", "updatedAt"],
//             },
//           },
//           {
//             model: User,
//             as: "user",
//             attributes: {
//               exclude: [
//                 "createdAt",
//                 "updatedAt",
//                 "gender",
//                 "picture",
//                 "role",
//                 "password",
//               ],
//             },
//           },
//         ],
//         attributes: {
//           exclude: [
//             "createdAt",
//             "updatedAt",
//             "userId",
//             "UserId",
//             "categoryId",
//             "CategoryId",
//           ],
//         },
//       });
//       return res.status(200).send({
//         message: "Book added",
//         data: { bookResult },
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       error: {
//         message: "Internal Server Error",
//       },
//     });
//   }
// };

exports.getApprovedBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await books.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        status: "Approved",
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "categoryId"],
      },
      include: [
        {
          model: users,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "phone",
              "address",
              "gender",
              "picture",
            ],
          },
        },

        {
          model: categories,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.send({
      message: "Response Successfuly Loaded",
      data: { book },
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

exports.getApprovedBooksCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await books.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        status: "Approved",
        categoryId: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "categoryId"],
      },
      include: [
        {
          model: users,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "phone",
              "address",
              "gender",
              "picture",
            ],
          },
        },

        {
          model: categories,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.send({
      message: "Response Successfuly Loaded",
      data: { book },
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

exports.addBook = async (req, res) => {
  const { role } = req.user;
  const { id } = req.user;
  try {
    const {
      title,
      author,
      publication,
      categoryId,
      page,
      about,
      isbn,
      thumbnail,
    } = req.body;

    const checkIsbn = await books.findOne({
      include: [
        {
          model: users,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },

      where: {
        isbn: req.body.isbn,
      },
    });

    if (checkIsbn) {
      return res.status(500).send({
        error: {
          message: "ISBN already exists",
        },
      });
    }

    // const thumbnail = req.files["thumbnail"][0].filename;
    // const file = req.files["file"][0].filename;
    const book = await books.create({
      ...req.body,
      userId: id,
      file: req.file.filename,
    });

    if (book) {
      const bookResult = await books.findOne({
        where: {
          id: book.id,
        },
        include: [
          {
            model: categories,
            as: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: users,
            as: "user",
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "password",
                "phone",
                "address",
                "gender",
                "picture",
                "role",
              ],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      return res.status(200).send({
        message: "Book has been added successfully",
        data: { bookResult },
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

exports.updateBook = async (req, res) => {
  try {
    const book = await books.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (book) {
      const updatedBook = await books.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: categories,
            as: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: users,
            as: "user",
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "gender",
                "picture",
                "role",
                "password",
              ],
            },
          },
        ],
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "userId",
            "UserId",
            "categoryId",
            "CategoryId",
          ],
        },
      });
      return res.status(200).send({
        message: "Book has been updated",
        data: { updatedBook },
      });
    } else {
      return res.status(404).send({
        message: "Book didn't exists",
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

exports.deleteBook = async (req, res) => {
  try {
    const book = await books.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (book) {
      const deleteBook = await books.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).send({
        data: {
          message: `Book with id ${id} has been deleted`,
          id: req.params.id,
        },
      });
    } else {
      return res.status(404).send({
        message: "Book didn't exists",
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
