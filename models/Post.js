const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Create Post model
class Post extends Model {}

// Create fields and restrictions for Post model
//posts (id, post_title, post content, user_id, created_at, updated_at)
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        post_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        timestamps: true,
        modelName: 'post'
    }
);

module.exports = Post;