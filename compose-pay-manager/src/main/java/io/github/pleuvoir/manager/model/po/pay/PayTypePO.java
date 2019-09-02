package io.github.pleuvoir.manager.model.po.pay;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.annotations.TableName;

import lombok.Data;

@Data
@TableName("p_pay_type")
public class PayTypePO {
	
	
	private String id;
	
	private String payTypeCode;
	
	private String payTypeName;
	
	private String remark;
	

	@Override
	public String toString() {
		return JSON.toJSONString(this);
	}
}