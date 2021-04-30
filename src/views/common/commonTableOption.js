export const versionManageColumn = [
    {
        prop: 'id',
        label: 'id',
        filterOption: {
            type: 'input',
            label: '版本名称',
            prop: 'versionName',
            placeholder: '请输入',
            formChildWidth: '250px',
        },
    },
    {
        prop: 'roleName',
        label: '权限名称',
    },
    {
        prop: 'roleAlias',
        label: '权限别名',
    },
    {
        prop: 'createTime',
        label: '创建时间',
    },
    {
        prop: 'operate',
        label: '操作',
    },
]
// 6按钮操作也可以进行配置
export const filterBtn = {
    type: 'button',
    children: [
        { type: 'search' },
        { type: 'reset' },
        {
            type: 'export',
            apiUrl: 'xxx',
            isLimit: true,
            fileName: '咕咕咕',
        },
    ],
}
