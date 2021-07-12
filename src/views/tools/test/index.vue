<template>
    <div class="container">
        <el-table :data="tableData" stripe style="width: 100%" size="mini">
            <el-table-column prop="name" label="名称" width="180"> </el-table-column>
            <el-table-column prop="yhtPrice" label="现实售价" width="180"> </el-table-column>
            <el-table-column prop="name" label="游戏仓库卖出总售价" width="180">
                <template slot-scope="scope">
                    <p>
                        {{ scope.row.produceCount * Number(scope.row.price) }}
                    </p>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="成本">
                <template slot-scope="scope">
                    <p>{{ scope.row | costFilter }}</p>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="材料">
                <template slot-scope="scope">
                    <p>{{ scope.row | materialsFilter }}</p>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { list1 } from '@/api/test'
export default {
    name: 'index',
    data() {
        return {
            tableData: [],
        }
    },
    filters: {
        costFilter(row) {
            if (row.itemList.length === 1) {
                let item = row.itemList[0]
                return `${((item.price / item.count) * row.materialNum).toFixed(5)}`
            } else {
                let data = ''
                let sum = 0
                row.itemList.forEach((item) => {
                    if (item.name.indexOf('莲藕')) {
                        let i1 = (item.count * Number(item.price)) / 8
                        sum += i1
                        data += `${i1} +`
                    } else if (item.name.indexOf('荷')) {
                        let i1 = (item.count * Number(item.price)) / 6
                        sum += i1
                        data += `${i1} +`
                    } else if (item.name.indexOf('稻')) {
                        let i1 = (item.count * Number(item.price)) / 10
                        sum += i1
                        data += `${i1} +`
                    } else {
                        let i1 = item.count * Number(item.price)
                        sum += i1
                        data += `${i1} +`
                    }
                })
                data = data.substring(0, data.length - 1)
                data += ` = ${sum} `
                return data
            }
        },
        materialsFilter(row) {
            if (row.itemList.length === 1) {
                return `材料：${row.itemList[0].name} 单价: ${row.itemList[0].price} 数量: ${(
                    row.materialNum / row.itemList[0].count
                ).toFixed(5)} `
            } else {
                let data = ''
                row.itemList.forEach((item) => {
                    data += `材料：${item.name} 单价: ${item.price} 数量: ${item.count}
                    \n
                    \t`
                })
                return data
            }
        },
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            list1()
                .then((res) => {
                    this.tableData = res.obj
                })
                .catch(() => {})
        },
    },
}
</script>

<style scoped></style>
