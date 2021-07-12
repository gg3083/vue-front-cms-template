export const modelForm = {
    id: { label: '', value: '', type: Number },
    login_name: { label: '', value: '', type: '' },
    real_name: { label: '姓名', value: '', type: '' },
    english_name: { label: '英文名', value: '', type: '' },
    email: { label: '邮箱', value: '', type: '' },
    telephone: { label: '电话', value: '', type: '' },
    job_no: { label: '工号', value: '', type: '' },
    password: { label: '登录密码', value: '', type: '' },
    gender: { label: '性别=={"0":"男","1":"女"}', value: '', type: Number },
    birth_day: { label: '出生日期', value: '', type: '' },
    head_img: { label: '头像', value: '', type: '' },
    address: { label: '住址', value: '', type: '' },
    create_time: { label: '创建时间', value: '', type: '' },
    update_time: { label: '更新时间', value: '', type: '' },
    delete_status: { label: '删除状态=={"0":"正常","1":"禁用"}', value: '', type: Number },
}
export const operateBtn = [
    { label: '添加', type: 'primary', size: 'mini', clickFunc: 'showAddModel' },
    {
        label: '搜索',
        type: 'info',
        size: 'mini',
        clickFunc: '_getPageTab1',
        args: [1, 10],
    },
]
export const tableColumn = [
    { prop: 'login_name', label: '' },
    {
        prop: 'real_name',
        label: '姓名',
    },
    { prop: 'english_name', label: '英文名' },
    { prop: 'email', label: '邮箱' },
    {
        prop: 'telephone',
        label: '电话',
    },
    { prop: 'job_no', label: '工号' },
    { prop: 'password', label: '登录密码' },
    {
        prop: 'gender',
        label: '性别=={"0":"男","1":"女"}',
    },
    { prop: 'birth_day', label: '出生日期' },
    { prop: 'head_img', label: '头像' },
    {
        prop: 'address',
        label: '住址',
    },
    { prop: 'create_time', label: '创建时间' },
    { prop: 'update_time', label: '更新时间' },
    {
        prop: 'operate',
        label: '操作',
        width: '400px',
        btnData: [
            { btnKey: 'editBtn', btnText: '编辑', btnType: 'primary', round: true },
            {
                btnKey: 'viewBtn',
                btnText: '查看',
                btnType: 'info',
                round: true,
            },
            { btnKey: 'delBtn', btnText: '删除', btnType: 'danger', round: true },
        ],
    },
]
export const searchFormColumn = [
    { prop: 'login_name', label: '', value: '' },
    {
        prop: 'real_name',
        label: '姓名',
        value: '',
    },
    { prop: 'english_name', label: '英文名', value: '' },
    { prop: 'email', label: '邮箱', value: '' },
    {
        prop: 'telephone',
        label: '电话',
        value: '',
    },
    { prop: 'job_no', label: '工号', value: '' },
    { prop: 'password', label: '登录密码', value: '' },
    {
        prop: 'gender',
        label: '性别=={"0":"男","1":"女"}',
        value: '',
    },
    { prop: 'birth_day', label: '出生日期', value: '' },
    { prop: 'head_img', label: '头像', value: '' },
    {
        prop: 'address',
        label: '住址',
        value: '',
    },
    { prop: 'create_time', label: '创建时间', value: '' },
    { prop: 'update_time', label: '更新时间', value: '' },
]
export const addModelFormColumn = [
    { prop: 'login_name', label: '', value: '' },
    {
        prop: 'real_name',
        label: '姓名',
        value: '',
    },
    { prop: 'english_name', label: '英文名', value: '' },
    { prop: 'email', label: '邮箱', value: '' },
    {
        prop: 'telephone',
        label: '电话',
        value: '',
    },
    { prop: 'job_no', label: '工号', value: '' },
    { prop: 'password', label: '登录密码', value: '' },
    {
        prop: 'gender',
        label: '性别=={"0":"男","1":"女"}',
        value: '',
    },
    { prop: 'birth_day', label: '出生日期', value: '' },
    { prop: 'head_img', label: '头像', value: '' },
    {
        prop: 'address',
        label: '住址',
        value: '',
    },
    { prop: 'create_time', label: '创建时间', value: '' },
    { prop: 'update_time', label: '更新时间', value: '' },
]
export const editModelFormColumn = [
    { prop: 'login_name', label: '', value: '' },
    {
        prop: 'real_name',
        label: '姓名',
        value: '',
    },
    { prop: 'english_name', label: '英文名', value: '' },
    { prop: 'email', label: '邮箱', value: '' },
    {
        prop: 'telephone',
        label: '电话',
        value: '',
    },
    { prop: 'job_no', label: '工号', value: '' },
    { prop: 'password', label: '登录密码', value: '' },
    {
        prop: 'gender',
        label: '性别=={"0":"男","1":"女"}',
        value: '',
    },
    { prop: 'birth_day', label: '出生日期', value: '' },
    { prop: 'head_img', label: '头像', value: '' },
    {
        prop: 'address',
        label: '住址',
        value: '',
    },
    { prop: 'create_time', label: '创建时间', value: '' },
    { prop: 'update_time', label: '更新时间', value: '' },
]
