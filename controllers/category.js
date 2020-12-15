const { categories } = require("../models");

exports.getAllCategory = async (req, res) => {
  try {
    const category = await categories.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    return res.status(200).send({
      message: "All existing category has been loaded successfully",
      data: { category },
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

exports.getCategory = async (req, res) => {
  try {
    const category = await categories.findOne({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      where: {
        id: req.params.id,
      },
    });
    if (category) {
      return res.status(200).send({
        message: "Category has been loaded",
        data: { category },
      });
    } else {
      return res.status(404).send({
        message: "Category didn't exist",
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

exports.addCategory = async (req, res) => {
  try {
    const category = await categories.create(req.body);

    return res.status(200).send({
      message: "Category added successfully",
      data: { category },
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

exports.updateCategory = async (req, res) => {
  try {
    const category = await categories.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (category) {
      const updatedCategory = await categories.findOne({
        where: {
          id: req.params.id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      return res.status(200).send({
        message: "Category has been updated!",
        data: { updatedCategory },
      });
    } else {
      return res.status(404).send({
        message: "Category didn't exist",
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

exports.deleteCategory = async (req, res) => {
  try {
    const category = await categories.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (category) {
      const deleteCategory = await categories.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).send({
        data: {
          message: "Category with corresponding id has been deleted",
          id: req.params.id,
        },
      });
    } else {
      return res.status(404).send({
        message: "Category didn't exist",
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
