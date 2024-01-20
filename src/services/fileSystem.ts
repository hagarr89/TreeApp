import { faker } from '@faker-js/faker';

export interface IFile {
    name:string;
    type:string;
    size?:string;
}


// fake api call for files
export const fetchFilesFromServer = ()=>{
    return new Promise((resolve, reject) => {
    setTimeout(() => {  
         resolve(genrateFiles()); // Simulate the response object
    }, 2000);
    });
}


const genrateFile = () => {
    const fileName = faker.system.commonFileName();
    const typeProps = genertaeFileType(fileName.split('.')[1]);
    const name = renderFileName(fileName , typeProps?.type);
    const file =  {
        name,        
        ...typeProps
    }
    return file;
}
 const genrateFiles = () => {
    let files:IFile[] | [] = [];
    const repeat =  Math.floor(Math.random() * 5) + 1;
    for(let i =0 ; i < repeat; i++) {
        const file =  genrateFile();
        files = [...files ,file]
    }
    return files;
}

//Helpers
const renderFileName = (fileName:string, type:string)=>{
    const fileNameArray = fileName.split('.');
    if(type === 'Folder'){
        return fileNameArray[0];
    }
    return fileName;
}


const genertaeFileType = (typeFile:string)=>{   
    const types  = ['Folder', typeFile];
    const type = types[Math.floor(Math.random() * types.length)];  
    const size = type !== 'Folder' && `${faker.number.int({ min: 30, max:500 })}KB`;
    return {
       ...(size && {size}),
        type,
    }
    
}
