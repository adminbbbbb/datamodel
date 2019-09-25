import DataConverter from './model/dataConverter'
import DSVStringConverter from './defaultConverters/dsvStringConverter';
import JSONConverter from './defaultConverters/jsonConverter';
import DSVArrayConverter from './defaultConverters/dsvArrayConverter';
import AutoDataConverter from './defaultConverters/autoCoverter'

class DataConverterStore {
    constructor(){
        this.store = new Map();
        this.converters(this._getDefaultConverters());
    }

    _getDefaultConverters(){
        return [
            new DSVStringConverter(),
            new DSVArrayConverter(),
            new JSONConverter(),
            new AutoDataConverter()
        ]
    }

    /**
     * 
     * @param  {Array<DataConverter>} converters : contains array of converter instance
     * @return { Map<String,DataConverter> } 
     */
    converters(converters){
        if(converters.length){
            converters.forEach(converter => this.store.set(converter.type,converter));
        }
        return this.store;
    }

    /**
     * 
     * @param {DataConverter} converter : converter Instance
     * @returns self
     */
    register(converter){
        if(converter instanceof DataConverter){
            this.store.set(converter.type,converter)
        }
        return this;
    }

    /**
     * 
     * @param {DataConverter} converter : converter Instance
     * @returns self
     */

    unregister(converter){
        this.store.delete(converter.type)
        return this;
    }

    get(name){
        if(this.store.has(name)){
            return this.store.get(name);
        }
        return null;
    }

}

const converterStore = (function (){
    let store = null;

    const getStore = () => {
        if (store === null) {
            store = new DataConverterStore();
        }
        return store;
    }
    return getStore();
});

export default converterStore;