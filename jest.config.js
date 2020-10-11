module.exports = {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**",
        "!**/__snapshots__/**",
    ],
    coverageReporters: ["text-summary", "html"],
    moduleNameMapper: {
        "\\.scss$": "identity-obj-proxy",
    },
};
