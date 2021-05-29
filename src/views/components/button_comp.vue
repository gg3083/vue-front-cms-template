<template>
    <el-button
        :size="buttonItem.size || 'mini'"
        :type="buttonItem.btnType || 'success'"
        :plain="buttonItem.plain || false"
        :round="buttonItem.round || false"
        :circle="buttonItem.circle || false"
        :loading="buttonItem.loading || false"
        :disabled="buttonItem.disabled || false"
        :icon="buttonItem.icon || ''"
        @click="btnClick"
    >
        {{ buttonItem.btnText }}
    </el-button>
</template>

<script>
export default {
    name: 'buttonComp',
    props: {
        buttonItem: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            defaultOption: {
                // 按钮默认配置
                reset: {
                    icon: 'el-icon-refresh-left',
                    type: 'warning',
                    text: '重 置',
                    emit: 'reset',
                },
                confirm: {
                    icon: 'el-icon-circle-check',
                    type: 'primary',
                    text: '确 定',
                    emit: 'confirm',
                },
                cancel: {
                    icon: 'el-icon-circle-close',
                    type: '',
                    text: '取 消',
                    emit: 'cancel',
                },
                search: {
                    icon: 'el-icon-search',
                    type: 'primary',
                    text: '查 询',
                    emit: 'search',
                },
                export: {
                    icon: 'el-icon-folder-opened',
                    type: 'info',
                    text: '导 出',
                    emit: 'exportFile',
                },
            },
        }
    },
    computed: {},
    methods: {
        btnClick() {
            this.$emit('clickFunc')
        },
    },
}
</script>

<style scoped></style>
