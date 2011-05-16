//Namespaces: global

var module = (function(global, undefined){

	//Group: Native extension

	/**
	 * Function: String.prototype.trim
	 * 	ECMA-262-5 15.5.4.20
	 * 	Trims whitespace from both ends of the string
	 */
	String.prototype.trim ||
	(String.prototype.trim = function(){
		return this.replace(/^\s+/, "").replace(/\s+$/, "");
	});

	/**
	 * Function: Array.prototype.forEach
	 * 	ECMA-262-5 15.4.4.18
	 * 	Calls a function for each element in the array.
	 * 
	 * Parameters:
	 * 	callbackfn - {Object} 
	 *	thisArg - {Object} {optional}
	 */
	Array.prototype.forEach ||
	(Array.prototype.forEach = function(callbackfn, thisArg){
		if (!typeof callbackfn === "function") 
			throw Error(callbackfn + " is not a function");
		// Pull out the length so that modifications to the length in the
		// loop will not affect the looping.        
		var len = this.length;
		for (var i = 0; i < len; ++i) {
			var current = this[i];
			if (current !== undefined || i in this) {
				callbackfn.call(thisArg, current, i, this);
			}
		}
	});

	/**
	 * Function: Function.prototype.bind
	 * 	ECMA-262-5 15.3.4.5
	 * 	Sets the value of this inside the function to always be
	 * 	the value of thisArg when the function is called. Optionally,
	 * 	function arguments can be specified (arg1, arg2, etc) that will
	 * 	automatically be prepended to the argument list whenever this
	 * 	function is called.
	 *
	 * Parameters:
	 * 	thisArg - {Function} 
	 * 	arg1 - {Object} {optinal}
	 * 	arg2 - {Object} arg2 {optinal}
	 *
	 * Example:
	 *  (code)
	 *	var flatFunction = obj.method.bind(obj);
	 *  (end)
	 */
	Function.prototype.bind ||
	(Function.prototype.bind = function(thisArg/* ,[arg1],[arg2],...*/){
		if (!typeof this === "function") 
			throw new Error("Bind must be called on a function");
		
		// thisArg is not an argument that should be bound.
		var argc_bound = (arguments.length || 1) - 1;
		if (argc_bound > 0) {
			var bound_args = new Array(argc_bound);
			for (var i = 0; i < argc_bound; i++) {
				bound_args[i] = arguments[i + 1];
			}
		}
		
		var fn = this;
		
		var result = function(){
			// Combine the args we got from the bind call with the args
			// given as argument to the invocation. 
			var argc = arguments.length;
			var args = new Array(argc + argc_bound);
			// Add bound arguments.
			for (var i = 0; i < argc_bound; i++) {
				args[i] = bound_args[i];
			}
			// Add arguments from call.
			for (var i = 0; i < argc; i++) {
				args[argc_bound + i] = arguments[i];
			}
			
			return fn.apply(thisArg, args);
		};
		
		return result;
	});


	//Group: module
	
	global.moduleConfig = global.moduleConfig||{};//������
	
	var config = {   //Ĭ��������
		"debug":true, //����ģʽ
		"host" : "./",  //Ĭ�Ϸ�������ַΪ������Ե�ַ
		"suffix" : ".js", //ģ���ļ���׺
		"charset" : "utf-8" //Ĭ���ַ���
	};
	
	for(var k in moduleConfig){
		config[k] = moduleConfig[k];
	};
	
	global.moduleConfig = config;
	
	//load regist install 

    var DOM = global.document,
		modules = {},//ģ��ֿ�
		isReady = false, //domReady ����ִ��һ��
		isDomReady = false, // ��ʾ DOM ready �¼��Ƿ񱻴�������������������Ϊtrue	
		moduleConstructor = {},
		
		registedModule = 0,
		isModuleReady = false,
		moduleInstallQueue= [], //ģ�鰲װ����
		
		
		readyHandler = [];	// DOM ready�¼�������
		
    
    var checkModule = function(ns){
        return modules.hasOwnProperty(ns);
    }
    
	/**
	 * ���ģ��
	 */
	var addModule = function(namespace, src){
	
		if(!namespace) return;
		
		if(namespace instanceof Array){
			
			namespace.forEach(function(v){
				addModule(v, src);
			});
		}else{
		
		    if (!checkModule(namespace)) {
				var module = {'namespace':namespace,'src':src};
				moduleInstallQueue.push(module);
			}
			else {
				throw new Error("namesapce hava been registed: "+namespace);
			}
		
		}
		

    };	
	

	
	/**
	 * ����ģ��
	 */
	var loadModule = function(){
	
		var host = config.host;
				
		if(host[host.length-1] !== '/') {
			host += "/";
		}
	
		moduleInstallQueue.forEach(function(module){
			
			var ns = module['namespace'],
				src = module['src'];
				
			var script = DOM.createElement("script");
			script.charset =  config.charset; //�ַ�������
			script.type = 'text/javascript';
			script.async = true; //�첽�����������ã�HTML5 �淶��
			script.src = src || (host + ns.split(".").join("/") + config.suffix); 

			var head = DOM.getElementsByTagName("head")[0] || DOM.body;
			head.appendChild(script); 
			
		});	

		
		

	};

	/**
	 * ע��ģ��
	 */
    var registModule = function(ns, fn){
        if (!checkModule(ns)) {
		
			moduleConstructor[ns] = fn;
			
			//ģ��ע�ἴ�¼�
			if( ++registedModule  ===  moduleInstallQueue.length){
			
				installModule();
			}
  			
            //console.log(ns + " module registed!");
        }
        else {
            throw new Error("namesapce hava been registed: "+ns);
        }
		
		
        
    };	
		
	/**
	 * ��װģ��
	 */	
	var installModule = function(){
	
		moduleInstallQueue.forEach(function(module){
			
			var ns = module['namespace'],
				fn = moduleConstructor[ns];
				
            modules[ns] = fn(global);			
			
		});		
		
		isModuleReady = true;
		if(isDomReady){	
			var mod = modules['_onReady'];
			mod.forEach(function(v){
				v();
			});
		}
		
	}
	
	/**
	 * ����ģ��
	 */	
	var callModule = function(ns){
		if (checkModule(ns)) {
           return  modules[ns];       
        }else {
            throw new Error("call a unregisted module: "+ns);
        }
	}	
	
	/**
     * DOM Ready ����
     */
    var domReady = function(fn){
		
		readyHandler.push(fn);

        // ready����ִֻ��һ��
        if (isReady) {
            return;
        }
		isReady = true;

        var run = function(e){	
			isDomReady = true;
			for (var i = 0, len = readyHandler.length; i < len; i++) {
				readyHandler.shift()(e);
			}
        }
        
        // ��� ��onReady()������ʱҳ���Ѿ�������ϣ���ֱ�����д���
        if (DOM.readyState === "complete") {
            return run();
        }
        
        // DOM-level 2 ��׼���¼�ע��ӿ� Mozilla, Opera, webkit ��֧�� 
        if (DOM.addEventListener) {
            // ע��DOMContentLoaded�¼��Ļص�����run
            DOM.addEventListener("DOMContentLoaded", run, false);
            
            // ͬʱע��load�¼��ص�������ȷ����ִ�� 
            global.addEventListener("load", run, false);
            
            //IE ���¼�ע��ӿ�
        }
        else  
			if (DOM.attachEvent) {
                // ensure firing before onload,
                // maybe late but safe also for iframes
                DOM.attachEvent("onreadystatechange", run);
                
                // A fallback to window.onload, that will always work
                global.attachEvent("onload", run);
                
                // If IE and not a frame
                // continually check to see if the DOM is ready
                var toplevel = false;
                
                try {
                    toplevel = global.frameElement == null;
                } 
                catch (e) {
                }
                
                if (DOM.documentElement.doScroll && toplevel) {
                    (function(){
                        try {
                            // If IE is used, use the trick by Diego Perini
                            // http://javascript.nwbox.com/IEContentLoaded/
                            DOM.documentElement.doScroll("left");
                        } 
                        catch (error) {
                            setTimeout(arguments.callee, 1);
                            return;
                        }
                        // no errors, fire
                        run();
                        
                    })();
                }
            }
    };	
	
	/*
	Function: module
		ģ������
		
	Parameters:
		ns - {String} ģ�������ռ�,��Сд����
		fn - {Function} ģ��
		
	Returns:
		module - {Object}
		
	Example:
		(code)
		module("lang.JSON",function(global){});
		(end)		
			
	*/	 
    var module = function(ns, fn){
		if(ns == undefined) return;
    
        if (fn === undefined) { //ģ�����
            return callModule(ns);
        }
        else {//ģ��ע��
            registModule(ns, fn);        
        }
        
    };
	

	
	
	/*
	Function: module.load
		ģ�����
		
	Parameters:
		namespace - {String|Array}
		src - {String}
	*/	 
	module.load = function(namespace, src){
			
		addModule(namespace, src);

	};
    
	/*
	Function: module.onReady
		onReady �¼�ע��
		
	Parameters:
		fn - {Function}
	*/	 
	module.onReady = function(fn){
		
		loadModule();
		
		if(modules['_onReady']){
			modules['_onReady'].push(fn);
		}else{
			modules['_onReady'] = [fn];
		}
		
		domReady(function(e){			
			if(isModuleReady){
				fn(e);
				//fn.isCalled = true;
			}	
		});
	 
        
    };	
	
	return module;
       
}(this));
