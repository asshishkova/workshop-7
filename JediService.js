const fs = require('fs').promises;
const jediFile = 'jedi_list.json';

async function replaceJedi(jediId, newJedi) {
  // const data = await getAll();
  // const index = data.findIndex(value => {
  //     return value.id === jediId;
  // });
  // const jedi = data[index];
  // Object.assign(jedi, newJedi);
  // await writeJediFile(data);
  // return jedi;
  const oldJedi = await getJedi(jediId);
  await deleteJedi(jediId);
  return await addJedi({...oldJedi, ...newJedi});
}

async function deleteJedi(id) {
    //TODO Delete jedi by given id in our file
    const data = await readJediFile();
    const updatedData = data.filter((value) => value.id !== id);
    await writeJediFile(updatedData);
}

async function getAll() {
    const data = await readJediFile();
    return data;
}

async function addJedi(jedi) {
    let data = await readJediFile();
    if (!data) {
        data = [];
    }
    data.push(jedi);
    await writeJediFile(data);
    return jedi;
}

async function getJedi(id) {
    const data = await readJediFile();
    return data.find((value) => value.id === id);
}

async function readJediFile() {
    try {
        const data = await fs.readFile(jediFile);
        // console.log(data.toString());
        return JSON.parse(data.toString());
    } catch (error) {
        console.error(`Got an error trying to read the file: ${error.message}`);
    }
}

async function writeJediFile(content) {
    try {
        await fs.writeFile(jediFile, JSON.stringify(content));
    } catch (error) {
        console.error(`Failed to write to file ${error.message}`);
    }
}

module.exports = {
    addJedi,
    getJedi,
    getAll,
    replaceJedi,
    deleteJedi,
};
