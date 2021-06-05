export const modelForm = {
    id: { label: '', value: '', type: Number },
    permAlias: { label: '', value: '' },
    permName: { label: '', value: '' },
    parentId: { label: '', value: '', type: Number },
    url: { label: '', value: '' },
    icon: { label: '', value: '' },
    updateTime: { label: '', value: '' },
    createTime: { label: '', value: '' },
}

export const tableColumn = [
    {
        prop: 'id',
        label: 'id',
    },
    {
        prop: 'permAlias',
        label: '权限别称',
    },
    {
        prop: 'permName',
        label: '权限名称',
    },
    {
        prop: 'parentId',
        label: '父级Id',
    },
    {
        prop: 'url',
        label: '菜单',
    },
    {
        prop: 'icon',
        label: '图标',
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
        prop: 'permAlias',
        label: '权限别称',
    },
    {
        prop: 'permName',
        label: '权限名称',
    },
    {
        prop: 'parentId',
        label: '父级Id',
    },
    {
        prop: 'url',
        label: '菜单',
    },
]

export const editModelFormColumn = [
    {
        prop: 'permAlias',
        label: '权限别称',
    },
    {
        prop: 'permName',
        label: '权限名称',
    },
    {
        prop: 'parentId',
        label: '父级Id',
    },
    {
        prop: 'url',
        label: '菜单',
    },
]

export const modelFormRules = {
    roleName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
}

export const addModelFormColumn = [
    {
        prop: 'permAlias',
        label: '权限别称',
    },
    {
        prop: 'parentId',
        label: '父级Id',
    },
    {
        prop: 'permName',
        label: '权限名称',
    },
    {
        prop: 'url',
        label: '菜单',
    },
]
