import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {

    input: 'src/index.ts',

    output: {
        file: 'lib/index.js',
        format: 'umd',
        name: 'tydi'
    },

    plugins: [
        resolve({ extensions: ['.ts', '.js'] }),
        typescript()
    ]
    
};
