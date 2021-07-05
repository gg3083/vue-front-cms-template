export const modelForm = {
    id: { label: '', value: '', type: Number },
    outTradeNo: { label: '', value: '' },
    tradeNo: { label: '', value: '' },
    totalAmount: { label: '', value: '' },
    subject: { label: '', value: '' },
}

export const tableColumn = [
    {
        prop: 'outTradeNo',
        label: '内部订单号',
    },
    {
        prop: 'tradeNo',
        label: '外部订单号',
    },
    {
        prop: 'totalAmount',
        label: '订单金额',
    },
    {
        prop: 'subject',
        label: '订单标题',
    },
    {
        prop: 'buyerLogonId',
        label: '购买人账户',
    },
    {
        prop: 'sellerEmail',
        label: '收款人帐号',
    },
    {
        prop: 'gmtCreate',
        label: '订单创建时间',
    },
    {
        prop: 'gmtPayment',
        label: '订单支付时间',
    },
    {
        prop: 'tradeStatus',
        label: '订单状态',
    },
    {
        prop: 'operate',
        label: '操作',
        width: '400px',
        btnData: [{ btnKey: 'viewBtn', btnText: '查看', btnType: 'info', round: true }],
    },
]

export const operateBtn = [
    {
        label: '搜索',
        type: 'info',
        size: 'mini',
        clickFunc: '_getPageTab1',
        args: [1, 20],
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
        prop: 'outTradeNo',
        label: '内部单号',
        value: '',
    },
    {
        prop: 'tradeNo',
        label: '外部单号',
    },
]

export const editModelFormColumn = []

export const modelFormRules = {}

export const addModelFormColumn = []
