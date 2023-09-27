export default (sequelize, DataTypes) =>
    sequelize.define(
        'news_item',

        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                ops: ['read'],
                frontEnd: {
                    label: 'Id',
                    index: 10,
                },
            },

            title: {
                type: DataTypes.STRING,
                allowNull: false,
                /* unique: true, */
                ops: ['read', 'update'],
            },

            description: {
                type: DataTypes.STRING,
                yoctoGen: { methods: ['read', 'update'] },
            },

            publisher_id: {
                type: DataTypes.STRING,
                yoctoGen: { methods: ['read', 'update'] },
            },

            link: {
                type: DataTypes.STRING,
                yoctoGen: { methods: ['read', 'update'] },
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            paranoid: false,
            underscored: true,
            opSettings: {
                create: 'admin',
                read: 'public',
                list: 'public',
                update: 'admin',
                delete: 'owner-or-admin',
            },
        }
    );
