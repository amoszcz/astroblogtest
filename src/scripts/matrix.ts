type Matrix2d = Array<Array<number>>

const getRowCols = (m1: Matrix2d) => ({
    rows: m1.length,
    cols: m1[0]?.length ?? 0,
})
export function multiply(m1: Matrix2d, m2: Matrix2d) {
    var result = []
    const { rows: m1Rows, cols: m1Cols } = getRowCols(m1)
    const { rows: m2Rows, cols: m2Cols } = getRowCols(m2)
    if (m2Cols !== m1Rows)
        throw `Multiplication is impossible for m2Cols = ${m2Cols} &&  m1Rows = ${m1Rows}`
    for (var i = 0; i < m1.length; i++) {
        result[i] = []
        for (var j = 0; j < m2[0].length; j++) {
            var sum = 0
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j]
            }
            result[i][j] = sum
        }
    }
    return result
}
