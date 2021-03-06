const Class = require('../core/Class');
const BasicLoader = require('./BasicLoader');
const GLTFParser = require('./GLTFParser');

/**
 * glTF模型加载类
 * @class
 * @extends {BasicLoader}
 * @example
 * var loader = new Hilo3d.GLTFLoader();
 * loader.load({
 *     src: '//ossgw.alicdn.com/tmall-c3/tmx/a9bedc04da498b95c57057d6a5d29fe7.gltf'
 * }).then(function (model) {
 *     stage.addChild(model.node);
 * });
 */
const GLTFLoader = Class.create(/** @lends GLTFLoader.prototype */{
    Extends: BasicLoader,
    /**
     * @constructs
     */
    constructor() {
        GLTFLoader.superclass.constructor.call(this);
    },
    /**
     * 加载glTF模型
     * @param {object} params 加载参数
     * @param {string} params.src glTF模型地址
     * @param {boolean} [params.isProgressive=false] 是否渐进式加载，图片加载完前使用占位图片
     * @param {boolean} [params.isUnQuantizeInShader=true] 是否在shader中进行量化解压数据
     * @param {function} [params.preHandlerImageURI=null] 图片URL预处理函数
     * @param {function} [params.customMaterialCreator=null] 是否使用自定义的Material创建器
     * @async
     * @return {Promise<Model, Error>} 返回加载完的模型对象
     */
    load(params) {
        return this.loadRes(params.src, 'buffer')
            .then(buffer => {
                let parser = new GLTFParser(buffer, params);
                parser.parse();
                return parser.loadResources(this).then(() => {
                    return parser.parseScene();
                });
            }).catch(err => {
                console.warn('load gltf failed', err.message, err.stack);
                throw err;
            });
    }
});

module.exports = GLTFLoader;

/**
 * GLTFLoader 模型加载完返回的对象格式
 * @typedef {object} Model
 * @property {Node} node 模型的根节点
 * @property {Mesh[]} meshes 模型的所有Mesh对象数组
 * @property {Animation} anim 模型的动画对象数组，没有动画的话为null
 * @property {Camera[]} cameras 模型中的所有Camera对象数组
 * @property {Light[]} lights 模型中的所有Light对象数组
 * @property {Texture[]} textures 模型中的所有Texture对象数组
 * @property {BasicMaterial[]} materials 模型中的所有Material对象数组
 */