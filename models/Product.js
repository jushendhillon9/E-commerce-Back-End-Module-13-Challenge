// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: (value) => { //value here is the inputted price value, value is always the inputted value 
          if (typeof value !== "DECIMAL") {
            throw new Error("Name must be a decimal");
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: (value) => {
          if (typeof value != "INTEGER" || typeof value != "DECIMAL") {
            throw new error("Stock value must be numeric");
          }
        }
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "id"
      },
      onDelete: "CASCADE"
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
