module.exports.resultFormat = resultFormat

function resultFormat (result) {
    if(result) {
        return {
            status: 200,
            data: 'success',
            msg: '操作成功'
        }
    }
    return {
        status: 200,
        data: 'err',
        msg: '操作失败'
    }
}