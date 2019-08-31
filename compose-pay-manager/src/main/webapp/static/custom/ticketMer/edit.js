//在编辑页面调用，进行初始化
function initEdit(index){
	if(index){
		goodsIndex = index;
	}
	//初始化校验
	initValidate();
	
	initKeyTypeCheckbox();
	initSignKeyModeRadio();
	initDataKeyModeCheck();
	
	initRmGoods();
	
	var selectGoods = $('#select-goods');
	selectGoods.select2();
	selectGoods.on('select2:select', function(e){
		var elem = e.params.data.element;
		if(elem && elem.value){
			addGoods(elem.value, elem.innerHTML);
		}
	});
}

var goodsIndex = 99;
function addGoods(goodsId, goodsName){
	if(!goodsId){
		return;
	}
	//重复添加商品判断
	var count = $('#goods-hide input[value='+goodsId+']').length;
	if(count>0){
		return;
	}
	var goodsBtn = $('<button type="button" id="goods_' + goodsIndex + '" class="btn btn-info btn-sm btn-outline btn-rounded m-r-xs">' + goodsName + ' <i class="fa fa-close"></i></button>');
	goodsBtn.on('click', rmGoods);
	$('#goods-show').append(goodsBtn);
	$('#goods-hide').append('<input type="hidden" id="hide_goods_' + goodsIndex + '" name="goodsId[' + goodsIndex + ']" value="' + goodsId + '">');
	goodsIndex++;
}

function rmGoods(){
	var btn = $(this);
	var btnId = btn.attr('id');
	btn.remove();
	$('#hide_'+btnId).remove();
}

//初始化，删除已存在的签约商品
function initRmGoods(){
	$('#goods-show button').on('click', rmGoods);
}

//初始化，密钥类型
function initKeyTypeCheckbox(){
	var keyTypeCheck = $('.key-type').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });
    keyTypeCheck.on('ifChecked', function(evn){
    	var keyType = $(this).val();
    	switch (keyType) {
		case '1':
			$('.sign-key-flag').removeClass('hide');
			break;
		case '2':
			$('.data-key-flag').removeClass('hide');
			break;
		}
    });
    keyTypeCheck.on('ifUnchecked', function(evn){
    	var keyType = $(this).val();
    	switch (keyType) {
		case '1':
			$('.sign-key-flag').addClass('hide');
			break;
		case '2':
			$('.data-key-flag').addClass('hide');
			break;
		}
    })
}

//初始化，签名密钥切换
function initSignKeyModeRadio(){
	var signKeyModeCheck = $('.sign-key-mode').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });
    signKeyModeCheck.on('ifChecked', function(evn){
    	var keyMode = $(this).val();
    	switch (keyMode) {
		case '1':
			$('.sign-sym').removeClass('hide');
			$('.sign-asym').addClass('hide');
			break;
		case '2':
			$('.sign-sym').addClass('hide');
			$('.sign-asym').removeClass('hide');
			break;
		}
    });
}


function initDataKeyModeCheck(){
	var dataKeyModeCheck = $('.data-key-mode').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });
    dataKeyModeCheck.on('ifChecked', function(evn){
    	var keyMode = $(this).val();
    	switch (keyMode) {
		case '1':
			$('.data-sym').removeClass('hide');
			$('.data-asym').addClass('hide');
			break;
		case '2':
			$('.data-sym').addClass('hide');
			$('.data-asym').removeClass('hide');
			break;
		}
    });
}

//检测有效天数是否正确  
jQuery.validator.addMethod("checkCustomDay", function(value, element) {  
	var customDay = document.getElementById('customDay').value;
	var tt=/^[1-9]\d*$/;
	var nn=/^\s*$/;
		  
    return !(!tt.test(customDay) && !nn.test(customDay));    
}, "有效天数请输入正整数");  

//初始化校验
function initValidate(){
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#create-form").validate({
		rules: {
			"ticketMer.merName":{
				required:true,
				maxlength:60
			},
			"ticketMer.merMarketerId":{
				required:true
			},
			'ticketMer.busLinkman':{
				maxlength:30
			},
			'ticketMer.busContact':{
				maxlength:20
			},
			'checkCustomDay':{
				checkCustomDay:true,
				maxlength:5
			}
		},
		messages: {
			"ticketMer.merName": {
				required:icon+'请填写合作商名称',
				maxlength:icon+'不能大于60个字符'
			},
			"ticketMer.merMarketerId": {
				required:icon+'请选择渠道联系人'
			},
			'ticketMer.busLinkman':{
				maxlength:icon+'不能大于30个字符'
			},
			'ticketMer.busContact':{
				maxlength:icon+'不能大于20个字符'
			},
			"checkCustomDay":{
				maxlength:icon+'不能超过五位数字'
			}
		}
	});
}

