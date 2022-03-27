const { Model, DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../config/connection');

//Create Comment model
class Comment extends Model {}


// Initialize Comment model with fields and restrictions
//comments (id, comment_text, post_id, user_id, created_at, updated_at)
Comment.init(
    {
        id: {
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;
