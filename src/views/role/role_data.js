export const modelForm = {
    id: { label: '', value: '', type: Number },
    roleAlias: { label: '', value: '' },
    roleName: { label: '', value: '' },
    updateTime: { label: '', value: '' },
    createTime: { label: '', value: '' },
}

export const tableColumn = [
    {
        prop: 'roleName',
        label: '角色名称',
    },
    {
        prop: 'roleAlias',
        label: '角色别称',
    },
    {
        prop: 'createTime',
        label: '创建时间',
        formatData: function(val) {
            return val
        },
    },
    {
        prop: 'operate',
        label: '操作',
        width: '400px',
        btnData: [
            { btnKey: 'viewBtn', btnText: '查看', btnType: 'info', round: true },
            { btnKey: 'editBtn', btnText: '编辑', btnType: 'primary', round: true },
            { btnKey: 'delBtn', btnText: '删除', btnType: 'danger', round: true },
        ],
    },
]

export const operateBtn = [
    {
        label: '搜索',
        type: 'info',
        size: 'mini',
        clickFunc: '_getPageTab1',
        args: [1, 10],
    },
    {
        label: '添加',
        type: 'primary',
        size: 'mini',
        clickFunc: 'showAddModel',
    },
]

export const searchFormColumn = [
    {
        prop: 'roleName',
        label: '角色名称',
        value: '',
    },
    {
        prop: 'roleAlias',
        label: '角色别称',
    },
]

export const editModelFormColumn = [
    {
        prop: 'roleName',
        label: '角色名称',
        value: '',
    },
    {
        prop: 'roleAlias',
        label: '角色别称',
    },
]

export const modelFormRules = {
    roleName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
}

export const addModelFormColumn = [
    {
        prop: 'roleName',
        label: '角色名称',
        value: '',
    },
    {
        prop: 'roleAlias',
        label: '角色别称',
    },
]
