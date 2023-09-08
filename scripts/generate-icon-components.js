const fs = require("fs")
const path = require("path")
const rimraf = require("rimraf")

const {
  pathToIcons,
  getSvgInfos,
  generateFileBasedOnSvgInfo,
  generateIndexFile,
} = require("./utils")

// recreate icon folder, clear possible stale file
rimraf.sync(pathToIcons)
fs.mkdirSync(pathToIcons)

const svgInfos = getSvgInfos()

// generate icons in parallel
Promise.all(svgInfos.map(generateFileBasedOnSvgInfo))
  .then(() => generateIndexFile(svgInfos))
  .then(() =>
    console.log("generate svg components successfully")
  )
  .catch((err) =>
    console.error(
      "error happened during generate svg components",
      err
    )
  )
