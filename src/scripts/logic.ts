import { multiply } from './matrix'

type Ctx = CanvasRenderingContext2D
type TwoNumbers = [number, number]
type Vector = [TwoNumbers, TwoNumbers]
function line(ctx: Ctx, ...p: Vector) {
    const [xStart, yStart] = p[0]
    const [xEnd, yEnd] = p[1]
    ctx.beginPath()
    ctx.moveTo(xStart, yStart)
    ctx.lineTo(xEnd, yEnd)
    ctx.stroke()
}

const transBy = (
    val: TwoNumbers,
    ...numbers: Array<TwoNumbers>
): [TwoNumbers, TwoNumbers] =>
    numbers.map((n) => [n[0] + val[0], n[1] + val[1]] as TwoNumbers) as [
        TwoNumbers,
        TwoNumbers,
    ]

const drawSchematic = (
    ctx: Ctx,
    options: {
        position: TwoNumbers
        dimensions: TwoNumbers
        max: number
    }
) => {
    const {
        position: [x, y],
        dimensions: [width, height],
        max,
    } = options

    const p00: TwoNumbers = [0, 0]
    const translation: TwoNumbers = [x, y + height]

    console.log('translation', JSON.stringify(translation))
    const vector: Vector = [
        [0, 0],
        [width, height],
    ]

    const transformation = (v: Vector) => {
        const inverted = multiply(v, [
            [1, 0],
            [0, -1],
        ]) as Vector // inversionX
        const scaled = multiply(inverted, [
            [width / max, 0],
            [0, height / max],
        ])
        return transBy(translation, ...scaled) as Vector
    }

    const lineX = [p00, [max, 0]] as Vector
    const lineY = [p00, [0, max]] as Vector

    line(ctx, ...transformation(lineX))
    line(ctx, ...transformation(lineY))
    ctx.font = '16px arial'
    ctx.fillText(max.toFixed(), x + 2, y + 8)
    ctx.fillText(max.toFixed(), x + width - 12, y + height - 16 + 8)

    return transformation
}

const drawVector = (
    vector: Vector,
    diagramTransformer: (v: Vector) => Vector
) => {
    line(ctx, ...diagramTransformer(vector))
}

const c = document.getElementById('c1') as HTMLCanvasElement
const ctx = c.getContext('2d')
const padding = 15
const dimensions: TwoNumbers = [c.width - 2 * padding, c.height - 2 * padding]
const transformer = drawSchematic(ctx, {
    position: [
        c.width / 2 - dimensions[0] / 2,
        c.height / 2 - dimensions[1] / 2,
    ],
    dimensions,
    max: 100,
})
const v: Vector = [
    [10, 20],
    [30, 40],
]
drawVector(v, transformer)
console.log('v', v)
const v2 = multiply(v, [
    [1, 1],
    [1, 1],
]) as Vector
console.log('v2', v2)
drawVector(v2, transformer)
