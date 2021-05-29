export const tableColumn = [
    {
        prop: 'jobNo',
        label: '工号',
    },
    {
        prop: 'loginName',
        label: '登录名',
    },
    {
        prop: 'realName',
        label: '真实姓名',
    },
    {
        prop: 'gender',
        label: '性别',
        formatData: function(val) {
            let cellVal = val === 0 ? '男' : val === 1 ? '女' : '未知'
            return `<span class="el-tag el-tag--${
                val === 0 ? arguments[1][0] : val === 1 ? arguments[1][1] : arguments[1][2]
            }">${cellVal}</span>`
        },
        tag: ['success', 'warning', 'info'],
    },
    {
        prop: 'telephone',
        label: '电话',
    },
    {
        prop: 'email',
        label: '邮箱',
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
            { btnKey: 'resetBtn', btnText: '重置密码', btnType: 'success', round: true, emit: 'resetEmit' },
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
        prop: 'jobNo',
        label: '工号',
        value: '',
    },
    {
        prop: 'loginName',
        label: '登录名',
        value: '',
    },
    {
        prop: 'realName',
        label: '真实姓名',
        value: '',
    },
    {
        prop: 'gender',
        label: '性别',
        value: '',
        type: 'select',
        typeData: [
            {
                label: '男',
                value: 0,
            },
            {
                label: '女',
                value: 1,
            },
        ],
        placeholder: '请选择性别',
    },
]

export const editModelFormColumn = [
    {
        prop: 'jobNo',
        label: '工号',
        value: '',
    },
    {
        prop: 'realName',
        label: '真实姓名',
        value: '',
    },
    {
        prop: 'gender',
        label: '性别',
        value: '',
        type: 'select',
        typeData: [
            {
                label: '男',
                value: 0,
            },
            {
                label: '女',
                value: 1,
            },
        ],
        placeholder: '请选择性别',
    },
]

export const modelForm = {
    address: { label: '', value: '' },
    birthDay: { label: '', value: '' },
    createTime: { label: '', value: '' },
    email: { label: '', value: '' },
    englishName: { label: '', value: '' },
    gender: { label: '', value: '', type: Number },
    headImg: { label: '', value: '' },
    id: { label: '', value: '', type: Number },
    jobNo: { label: '工号', value: '', type: Number },
    realName: { label: '', value: '' },
    loginName: { label: '', value: '' },
    telephone: { label: '', value: '' },
}

export const modelFormRules = {
    jobNo: [{ required: true, message: '请输入工号', trigger: ['blur'] }],
    realName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    loginName: [{ required: true, message: '请输入登录名', trigger: 'blur' }],
}

export const addModelFormColumn = [
    {
        prop: 'jobNo',
        label: '工号',
        value: '',
    },
    {
        prop: 'realName',
        label: '真实姓名',
        value: '',
    },
    {
        prop: 'loginName',
        label: '登录名称',
        value: '',
    },
    {
        prop: 'gender',
        label: '性别',
        value: '',
        type: 'select',
        typeData: [
            {
                label: '男',
                value: 0,
            },
            {
                label: '女',
                value: 1,
            },
        ],
        placeholder: '请选择性别',
    },
]
