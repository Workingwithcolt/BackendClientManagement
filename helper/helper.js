const delteFileUnderFolder = async (dirpath) => {
    const files = await fs.readdir(dirpath);

    const deleteFilePromises = files.map(file =>
        fs.unlink(path.join(dirpath, file)),
    );

    await Promise.all(deleteFilePromises);
}

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

module.exports = { asyncHandler }