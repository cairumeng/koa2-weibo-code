/**
 * @description utils controller
 * @author rumengbaobao
 */

const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')

//存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')

//文件最大体积是一兆
const MAX_SIZE = 1024 * 1024 * 1024

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH ).then(exist=>{
  if(!exist){
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

/**
 * 
 * @param {string} name
 * @param {string} type 
 * @param {number} size
 * @param {string} filePath
 */
const saveFile = async ({ name, type, size, filePath }) => {
  if (size > MAX_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }
  //移动文件，koafrom 已上传的文件放到指定地方
  const fileName = Date.now() + '.' + name // 防止重名
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName) // 目的地
  await fse.move(filePath, distFilePath)

  //返回信息 线上需要用同一文件服务来保证多线程文件同一
  return new SuccessModel({
    url: '/' + fileName
  })
}

module.exports = { saveFile }