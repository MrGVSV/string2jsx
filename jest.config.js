module.exports = {
    preset: "ts-jest/presets/js-with-ts",
	roots: ["<rootDir>/src"],
	transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.jsx?$": "babel-jest"
	},
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    transformIgnorePatterns: ["node_modules/(?!(@babel)/)"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    verbose: true,
    automock: false
};
