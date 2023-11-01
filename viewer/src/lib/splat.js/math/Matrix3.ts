import type { Vector3 } from "./Vector3";

class Matrix3 {
    buffer: number[];

    // prettier-ignore
    constructor(n11: number = 1, n12: number = 0, n13: number = 0,
        n21: number = 0, n22: number = 1, n23: number = 0,
        n31: number = 0, n32: number = 0, n33: number = 1) {
        this.buffer = new Array(9);

        this.set(
            n11, n12, n13,
            n21, n22, n23,
            n31, n32, n33
        );
    }

    // prettier-ignore
    set(n11: number, n12: number, n13: number,
        n21: number, n22: number, n23: number,
        n31: number, n32: number, n33: number): Matrix3 {
        const e = this.buffer;

        e[0] = n11; e[1] = n12; e[2] = n13;
        e[3] = n21; e[4] = n22; e[5] = n23;
        e[6] = n31; e[7] = n32; e[8] = n33;

        return this;
    }

    multiply(m: Matrix3): Matrix3 {
        const a = this.buffer;
        const b = m.buffer;
        return new Matrix3(
            b[0] * a[0] + b[1] * a[3] + b[2] * a[6],
            b[0] * a[1] + b[1] * a[4] + b[2] * a[7],
            b[0] * a[2] + b[1] * a[5] + b[2] * a[8],
            b[3] * a[0] + b[4] * a[3] + b[5] * a[6],
            b[3] * a[1] + b[4] * a[4] + b[5] * a[7],
            b[3] * a[2] + b[4] * a[5] + b[5] * a[8],
            b[6] * a[0] + b[7] * a[3] + b[8] * a[6],
            b[6] * a[1] + b[7] * a[4] + b[8] * a[7],
            b[6] * a[2] + b[7] * a[5] + b[8] * a[8]
        );
    }

    clone(): Matrix3 {
        const e = this.buffer;
        // prettier-ignore
        return new Matrix3(
            e[0], e[1], e[2],
            e[3], e[4], e[5],
            e[6], e[7], e[8]
        );
    }

    static RotationFromEuler(m: Vector3): Matrix3 {
        const cx = Math.cos(m.x);
        const sx = Math.sin(m.x);
        const cy = Math.cos(m.y);
        const sy = Math.sin(m.y);
        const cz = Math.cos(m.z);
        const sz = Math.sin(m.z);

        const rotationMatrix = [
            cy * cz + sy * sx * sz,
            -cy * sz + sy * sx * cz,
            sy * cx,
            cx * sz,
            cx * cz,
            -sx,
            -sy * cz + cy * sx * sz,
            sy * sz + cy * sx * cz,
            cy * cx,
        ];

        return new Matrix3(...rotationMatrix);
    }
}

export { Matrix3 };
