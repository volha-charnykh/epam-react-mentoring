module.exports = {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**",
    ],
    coverageReporters: ["text-summary"],
    moduleNameMapper: {
        "\\.scss$": "identity-obj-proxy",
    },
};
