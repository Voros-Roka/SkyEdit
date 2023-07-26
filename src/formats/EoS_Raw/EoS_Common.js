import { i18n } from "../../utils.js";

export class EoS_DataView
{
	#dataview = null;
	#byte_offset = 0;

	constructor(dataview,offset = 0,length)
	{
		if(dataview instanceof DataView)
		{
			this.#byte_offset = dataview.byteOffset+offset;
			this.#dataview = new DataView(dataview.buffer,this.#byte_offset,length);
		}
		else if(dataview instanceof EoS_DataView)
		{
			this.#byte_offset = dataview.byteoffset+offset;
			this.#dataview = new DataView(dataview.dataview.buffer,this.#byte_offset,length);
		}
		else if(dataview instanceof ArrayBuffer)
		{
			this.#dataview = new DataView(dataview,offset,length);
		}
		else
		{
			throw new Error(i18n`EoS_DataView does not support '${dataview}'`);
		}
	}

	get dataview()
	{
		return this.#dataview;
	}

	get byteoffset()
	{
		return this.#byte_offset;
	}

	getString(encoding,byteOffset,length)
	{
		let target = new Uint8Array(this.#dataview.buffer,byteOffset+this.#dataview.byteOffset,length);
		if(!length)
		{
			length = target.length
		}

		let true_length = 0;
		while(target[true_length] != 0 && true_length < length)
		{
			true_length++;
		}

		if(true_length != 0)
		{
			target = target.slice(0,true_length);
			return (new TextDecoder(encoding)).decode(target);
		}

		return "";

	}

	setString(encoding,byteOffset,value,length,fillzero=false)
	{
		let src = (new TextEncoder(encoding)).encode(value);
		let trg = null;
		if(length)
		{
			trg = new Uint8Array(this.#dataview.buffer,byteOffset+this.#dataview.byteOffset,length);
			src = src.slice(0,length);
			if(fillzero)
			{
				trg.fill(0,src.length,length);
			}
		}
		else
		{
			trg = new Uint8Array(this.#dataview.buffer,byteOffset+this.#dataview.byteOffset);
		}
		trg.set(src);
	}

//////////////////////////////////////////
// GET
//////////////////////////////////////////

	getBool(byteOffset, littleEndian)
	{
		if(this.#dataview.getInt8(byteOffset))
		{
			return true;
		}
		return false;
	}

	getInt8(byteOffset, littleEndian)
	{
		return this.#dataview.getInt8(byteOffset);
	}

	getUint8(byteOffset, littleEndian)
	{
		return this.#dataview.getUint8(byteOffset);
	}

	getInt16(byteOffset, littleEndian)
	{
		return this.#dataview.getInt16(byteOffset, littleEndian);
	}

	getUint16(byteOffset, littleEndian)
	{
		return this.#dataview.getUint16(byteOffset, littleEndian);
	}

	getInt32(byteOffset, littleEndian)
	{
		return this.#dataview.getInt32(byteOffset, littleEndian);
	}

	getUint32(byteOffset, littleEndian)
	{
		return this.#dataview.getUint32(byteOffset, littleEndian);
	}

	getFloat32(byteOffset, littleEndian)
	{
		return this.#dataview.getFloat32(byteOffset, littleEndian);
	}

	getFloat64(byteOffset, littleEndian)
	{
		return this.#dataview.getFloat64(byteOffset, littleEndian);
	}

//////////////////////////////////////////
// SET
//////////////////////////////////////////

	setBool(byteOffset, value)
	{
		if(value == true)
		{
			this.#dataview.setInt8(byteOffset, 0x01);
		}
		else if(value == false)
		{
			this.#dataview.setInt8(byteOffset, 0x00);
		}
	}

	setInt8(byteOffset, value)
	{
		this.#dataview.setInt8(byteOffset, value);
	}

	setUint8(byteOffset, value)
	{
		this.#dataview.setUint8(byteOffset, value);
	}

	setInt16(byteOffset, value, littleEndian)
	{
		this.#dataview.setInt16(byteOffset, value, littleEndian);
	}

	setUint16(byteOffset, value, littleEndian)
	{
		this.#dataview.setUint16(byteOffset, value, littleEndian);
	}

	setInt32(byteOffset, value, littleEndian)
	{
		this.#dataview.setInt32(byteOffset, value, littleEndian);
	}

	setUint32(byteOffset, value, littleEndian)
	{
		this.#dataview.setUint32(byteOffset, value, littleEndian);
	}

	setFloat32(byteOffset, value, littleEndian)
	{
		this.#dataview.setFloat32(byteOffset, value, littleEndian);
	}

	setFloat64(byteOffset, value, littleEndian)
	{
		this.#dataview.setFloat64(byteOffset, value, littleEndian);
	}

//////////////////////////////////////////
// GET ARRAY
//////////////////////////////////////////

	getBoolArray(byteOffset,bytelength)
	{
		let result = [];

		for(let i = 0; i < bytelength;i++)
		{
			let data = this.#dataview.getUint8(byteOffset + i);
			result.push((data & 0x01)?true:false);
			result.push((data & 0x02)?true:false);
			result.push((data & 0x04)?true:false);
			result.push((data & 0x08)?true:false);
			result.push((data & 0x10)?true:false);
			result.push((data & 0x20)?true:false);
			result.push((data & 0x40)?true:false);
			result.push((data & 0x80)?true:false);
		}
		return result;
	}

	getInt8Array(byteOffset=0, length)
	{
		let result = [];
		for(let i = 0; i < length; i++)
		{
			result.push(this.#dataview.getInt8(byteOffset + i));
		}
		return result;
	}

	getUint8Array(byteOffset=0, length)
	{
		let result = [];
		for(let i = 0; i < length; i++)
		{
			result.push(this.#dataview.getUint8(byteOffset + i));
		}
		return result;
	}

	getInt16Array(byteOffset=0, length, littleEndian)
	{
		let result = [];
		for(let i = 0; i < length; i++)
		{
			result.push(this.#dataview.getInt16(byteOffset + (i*2),littleEndian));
		}
		return result;
	}

	getUint16Array(byteOffset=0, length, littleEndian)
	{
		let result = [];
		for(let i = 0; i < length; i++)
		{
			result.push(this.#dataview.getUint16(byteOffset + (i*2),littleEndian));
		}
		return result;
	}

	getInt32Array(byteOffset=0, length, littleEndian)
	{
		let result = [];
		for(let i = 0; i < length; i++)
		{
			result.push(this.#dataview.getInt32(byteOffset + (i*4),littleEndian));
		}
		return result;
	}

	getUint32Array(byteOffset=0, length, littleEndian)
	{
		let result = [];
		for(let i = 0; i < length; i++)
		{
			result.push(this.#dataview.getUint32(byteOffset + (i*4),littleEndian));
		}
		return result;
	}

	getFloat32Array(byteOffset=0, length, littleEndian)
	{
		let result = [];
		for(let i = 0; i < length; i++)
		{
			result.push(this.#dataview.getFloat32(byteOffset + (i*4),littleEndian));
		}
		return result;
	}

//////////////////////////////////////////
// SET ARRAY
//////////////////////////////////////////

	setBoolArray(byteOffset,bytelength,value)
	{
		for(let i = 0; i < bytelength;i++)
		{
			let data = 0;
			data |= value[(i*8)+0]?0x01:0x00;
			data |= value[(i*8)+1]?0x02:0x00;
			data |= value[(i*8)+2]?0x04:0x00;
			data |= value[(i*8)+3]?0x08:0x00;
			data |= value[(i*8)+4]?0x10:0x00;
			data |= value[(i*8)+5]?0x20:0x00;
			data |= value[(i*8)+6]?0x40:0x00;
			data |= value[(i*8)+7]?0x80:0x00;
			this.#dataview.setUint8(byteOffset + i,data);
		}
	}

	setInt8Array(byteOffset=0, length, value)
	{
		for(let i = 0; i < length; i++)
		{
			this.#dataview.setInt8(byteOffset + i, value[i]);
		}
	}

	setUint8Array(byteOffset=0, length, value)
	{
		for(let i = 0; i < length; i++)
		{
			this.#dataview.setUint8(byteOffset + i, value[i]);
		}
	}

	setInt16Array(byteOffset=0, length, value, littleEndian)
	{
		for(let i = 0; i < length; i++)
		{
			this.#dataview.setInt16(byteOffset + (i*2), value[i], littleEndian);
		}
	}

	setUint16Array(byteOffset=0, length, value, littleEndian)
	{
		for(let i = 0; i < length; i++)
		{
			this.#dataview.setUint16(byteOffset + (i*2), value[i], littleEndian);
		}
	}

	setInt32Array(byteOffset=0, length, value, littleEndian)
	{
		for(let i = 0; i < length; i++)
		{
			this.#dataview.setInt32(byteOffset + (i*4), value[i], littleEndian);
		}
	}

	setUint32Array(byteOffset=0, length, value, littleEndian)
	{
		for(let i = 0; i < length; i++)
		{
			this.#dataview.setUint32(byteOffset + (i*4), value[i], littleEndian);
		}
	}

	setFloat32Array(byteOffset=0, length, value, littleEndian)
	{
		for(let i = 0; i < length; i++)
		{
			this.#dataview.setFloat32(byteOffset + (i*4), value[i], littleEndian);
		}
	}
}

//////////////////////////////////////////
// Bit View
//////////////////////////////////////////

export class EoS_DataBitView
{
	#dataview = null;
	#bit_offset = 0;
	#byte_offset = 0;

	constructor(dataview,offset = 0,length)
	{
		let unit_offset = (offset >> 3);
		this.#bit_offset = offset & 7;
		let unit_length = (length + 7 + this.#bit_offset) >> 3;

		if(dataview instanceof DataView)
		{
			this.#byte_offset = dataview.byteOffset+unit_offset;
			this.#dataview = new DataView(dataview.buffer,this.#byte_offset,length);
		}
		else if(dataview instanceof EoS_DataView)
		{
			this.#byte_offset = dataview.byteoffset+unit_offset;
			this.#dataview = new DataView(dataview.dataview.buffer,this.#byte_offset,length);
		}
		else if(dataview instanceof EoS_DataBitView)
		{
			this.#bit_offset = (offset + dataview.bitoffset) & 7;
			unit_length = (length + 7 + this.#bit_offset) >> 3;
			unit_offset = ((offset + dataview.bitoffset) >> 3);
			this.#byte_offset = dataview.byteoffset+unit_offset;
			this.#dataview = new DataView(dataview.dataview.buffer,this.#byte_offset,unit_length);

		}
		else if(dataview instanceof ArrayBuffer)
		{
			this.#dataview = new DataView(dataview,unit_offset,length);
		}
		else
		{
			throw new Error(i18n`EoS_DataView does not support '${dataview}'`);
		}


		if(dataview instanceof DataView)
		{
			this.#dataview = new DataView(dataview.buffer,dataview.byteOffset+unit_offset,unit_length);
		}
		else if(dataview instanceof EoS_DataView)
		{
			this.#dataview = new DataView(dataview.dataview.buffer,dataview.dataview.byteOffset+unit_offset,unit_length);
		}
		else if(dataview instanceof EoS_DataBitView)
		{
			this.bit_start = (offset + dataview.bitoffset) & 7;
			unit_offset = ((offset + dataview.bitoffset) >> 3);
			this.#dataview = new DataView(dataview.dataview.buffer,dataview.dataview.byteOffset+unit_offset,unit_length);

		}
		else if(dataview instanceof ArrayBuffer)
		{
			this.#dataview = new DataView(dataview,unit_offset,unit_length);
		}
		else
		{
			throw new Error(i18n`EoS_DataBitView does not support '${dataview}'`);
		}
	}

	get dataview()
	{
		return this.#dataview;
	}

	get byteoffset()
	{
		return this.#byte_offset;
	}

	get bitoffset()
	{
		return this.#bit_offset;
	}

	getString(encoding,bitOffset,length)
	{
		if(!length)
		{
			length = this.#dataview.buffer.length - (bitOffset >> 3);
		}

		let tmp_array = new ArrayBuffer(2);
		let tmp_view = new DataView(tmp_array);

		let target = new Uint8Array(length);

		bitOffset += this.#bit_offset;

		let true_length = 0;
		for(let i = 0; i < length; i++)
		{
			let unit_offset = bitOffset >> 3;
			let unit_bit_offset = bitOffset & 7;

			if(unit_bit_offset == 0)
			{
				let data_8 = this.#dataview.getUint8(unit_offset);
				target[i] = data_8;
			}
			else
			{
				let data_16 = this.#dataview.getUint16(unit_offset,true);
				tmp_view.setUint16(0,data_16 >> unit_bit_offset,true);
				target[i] = tmp_view.getUint8(0);
			}
			bitOffset += 8;

			if(target[i] == 0)
			{
				break;
			}

			true_length++;
		}

		if(true_length != 0)
		{
			target = target.slice(0,true_length);
			return (new TextDecoder(encoding)).decode(target);
		}
		return "";

	}

	setString(encoding,bitOffset,value,length,fillzero=false)
	{
		let src = (new TextEncoder(encoding)).encode(value);
		let trg = null;
		let bitCount = 8;
		if(length)
		{
			trg = new Uint8Array(length);
			src = src.slice(0,length);
			if(fillzero)
			{
				trg.fill(0,src.length,length);
			}
		}
		else
		{
			trg = new Uint8Array();
		}
		trg.set(src);
		
		
		
		let tmp_array = new ArrayBuffer(1);
		let tmp_view = new DataView(tmp_array);
		let mask = 0xFF;

		for(let i = 0; i < length; i++)
		{
			let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
			let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

			trg[i] &= mask;
			tmp_view.setUint8(0,trg[i]);

			if((unit_bit_offset + bitCount) > 8)
			{
				let original = this.#dataview.getUint16(unit_offset, true);
				original &= ~(mask << unit_bit_offset);
				original |= tmp_view.getUint8(0,true) << unit_bit_offset;
				this.#dataview.setUint16(unit_offset, original, true);
			}
			else
			{
				let original = this.#dataview.getUint8(unit_offset);
				original &= ~(mask << unit_bit_offset);
				original |= tmp_view.getUint8(0) << unit_bit_offset;
				this.#dataview.setUint8(unit_offset, original);
			}
			bitOffset += bitCount;
		}
	}

//////////////////////////////////////////
// GET
//////////////////////////////////////////

	getBool(bitOffset)
	{
		let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
		let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

		let data_8 = this.#dataview.getUint8(unit_offset);

		if((data_8 & (0x01 << unit_bit_offset)) != 0x00)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	getInt8(bitOffset, bitCount = 8)
	{
		let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
		let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

		let tmp_array = new ArrayBuffer(2);
		let tmp_view = new DataView(tmp_array);

		if((unit_bit_offset + bitCount) > 8)
		{
			let data_16 = this.#dataview.getUint16(unit_offset,true);
			tmp_view.setUint16(0,data_16 >> unit_bit_offset,true);
		}
		else
		{
			let data_8 = this.#dataview.getUint8(unit_offset);
			tmp_view.setUint16(0, data_8 >> unit_bit_offset,true);
		}

		return (tmp_view.getInt8(0) << (32 - bitCount)) >> (32 - bitCount);
	}

	getUint8(bitOffset, bitCount = 8)
	{
		let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
		let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

		let tmp_array = new ArrayBuffer(2);
		let tmp_view = new DataView(tmp_array);

		if((unit_bit_offset + bitCount) > 8)
		{
			let data_16 = this.#dataview.getUint16(unit_offset,true);
			tmp_view.setUint16(0,data_16 >> unit_bit_offset,true);
		}
		else
		{
			let data_8 = this.#dataview.getUint8(unit_offset);
			tmp_view.setUint16(0, data_8 >> unit_bit_offset,true);
		}

		let res = tmp_view.getUint8(0);
		let mask = ((0x01 << bitCount)-1);

		return res & mask;
	}

	getInt16(bitOffset, littleEndian, bitCount = 16)
	{
		let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
		let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

		let tmp_array = new ArrayBuffer(4);
		let tmp_view = new DataView(tmp_array);

		if((unit_bit_offset + bitCount) > 16)
		{
			let data_32 = this.#dataview.getUint16(unit_offset,true);
			let data_16 = this.#dataview.getUint16(unit_offset+1,true);
			tmp_view.setUint16(0,data_32 >> unit_bit_offset,true);
			tmp_view.setUint16(1,data_16 >> unit_bit_offset,true);
		}
		else
		{
			let data_16 = this.#dataview.getUint16(unit_offset,true);
			tmp_view.setUint32(0,data_16 >> unit_bit_offset,true);
		}

		return (tmp_view.getInt16(0, littleEndian) << (32 - bitCount)) >> (32 - bitCount);
	}

	getUint16(bitOffset, littleEndian, bitCount = 16)
	{
		let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
		let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

		let tmp_array = new ArrayBuffer(3);
		let tmp_view = new DataView(tmp_array);

		if((unit_bit_offset + bitCount) > 16)
		{
			let data_32 = this.#dataview.getUint16(unit_offset,true);
			let data_16 = this.#dataview.getUint16(unit_offset+1,true);
			tmp_view.setUint16(0,data_32 >> unit_bit_offset,true);
			tmp_view.setUint16(1,data_16 >> unit_bit_offset,true);
		}
		else
		{
			let data_16 = this.#dataview.getUint16(unit_offset,true);
			tmp_view.setUint16(0,data_16 >> unit_bit_offset,true);
		}

		return tmp_view.getUint16(0, littleEndian) & ((0x01 << bitCount)-1);
	}

	getInt32(bitOffset, littleEndian, bitCount = 32)
	{
		let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
		let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

		let tmp_array = new ArrayBuffer(5);
		let tmp_view = new DataView(tmp_array);

		if((unit_bit_offset + bitCount) > 32)
		{
			let data_32 = this.#dataview.getUint32(unit_offset,true);
			let data_16 = this.#dataview.getUint16(unit_offset+3,true);
			tmp_view.setUint32(0,data_32 >> unit_bit_offset,true);
			tmp_view.setUint16(3,data_16 >> unit_bit_offset,true);
		}
		else
		{
			let data_32 = this.#dataview.getUint32(unit_offset,true);
			tmp_view.setUint32(0,data_32 >> unit_bit_offset,true);
		}

		return (tmp_view.getInt32(0, littleEndian) << (32 - bitCount)) >> (32 - bitCount);

	}

	getUint32(bitOffset, littleEndian, bitCount = 32)
	{
		let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
		let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

		let tmp_array = new ArrayBuffer(5);
		let tmp_view = new DataView(tmp_array);

		if((unit_bit_offset + bitCount) > 32)
		{
			let data_32 = this.#dataview.getUint32(unit_offset,true);
			let data_16 = this.#dataview.getUint16(unit_offset+3,true);
			tmp_view.setUint32(0,data_32 >> unit_bit_offset,true);
			tmp_view.setUint16(3,data_16 >> unit_bit_offset,true);
		}
		else
		{
			let data_32 = this.#dataview.getUint32(unit_offset,true);
			tmp_view.setUint32(0,data_32 >> unit_bit_offset,true);
		}

		if(bitCount > 31)
		{
			return tmp_view.getUint32(0, littleEndian);
		}
		else
		{
			return tmp_view.getUint32(0, littleEndian) & ((0x01 << bitCount)-1);
		}
	}

	getFloat32(bitOffset, littleEndian)
	{
		let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
		let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

		let tmp_array = new ArrayBuffer(5);
		let tmp_view = new DataView(tmp_array);

		if((unit_bit_offset + 32) > 32)
		{
			let data_32 = this.#dataview.getUint32(unit_offset,true);
			let data_16 = this.#dataview.getUint16(unit_offset+3,true);
			tmp_view.setUint32(0,data_32 >> unit_bit_offset,true);
			tmp_view.setUint16(3,data_16 >> unit_bit_offset,true);
		}
		else
		{
			let data_32 = this.#dataview.getUint32(unit_offset,true);
			tmp_view.setUint32(0,data_32 >> unit_bit_offset,true);
		}

		return tmp_view.getFloat32(0, littleEndian);
	}

//////////////////////////////////////////
// SET
//////////////////////////////////////////

	setBool(bitOffset, value)
	{
		let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
		let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

		let data_8 = this.#dataview.getUint8(unit_offset);

		data_8 &= ~(0x01 << unit_bit_offset);

		if(value == true)
		{
			data_8 |= 0x01 << unit_bit_offset;
		}
		else if(value == false)
		{
			data_8 &= ~(0x01 << unit_bit_offset);
		}

		this.#dataview.setUint8(unit_offset, data_8);
	}

	setInt8(bitOffset, value, bitCount = 8)
	{
		let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
		let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

		let tmp_array = new ArrayBuffer(1);
		let tmp_view = new DataView(tmp_array);

		let mask = ((0x01 << bitCount)-1);
		value &= mask;
		tmp_view.setInt8(0,value);

		if((unit_bit_offset + bitCount) > 8)
		{
			let original = this.#dataview.getUint16(unit_offset, true);
			original &= ~(mask << unit_bit_offset);
			original |= tmp_view.getUint8(0,true) << unit_bit_offset;
			this.#dataview.setUint16(unit_offset, original, true);
		}
		else
		{
			let original = this.#dataview.getUint8(unit_offset);
			original &= ~(mask << unit_bit_offset);
			original |= tmp_view.getUint8(0) << unit_bit_offset;
			this.#dataview.setUint8(unit_offset, original);
		}
	}

	setUint8(bitOffset, value, bitCount = 8)
	{
		let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
		let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

		let tmp_array = new ArrayBuffer(1);
		let tmp_view = new DataView(tmp_array);

		let mask = ((0x01 << bitCount)-1);
		value &= mask;
		tmp_view.setUint8(0,value);

		if((unit_bit_offset + bitCount) > 8)
		{
			let original = this.#dataview.getUint16(unit_offset, true);
			original &= ~(mask << unit_bit_offset);
			original |= tmp_view.getUint8(0,true) << unit_bit_offset;
			this.#dataview.setUint16(unit_offset, original, true);
		}
		else
		{
			let original = this.#dataview.getUint8(unit_offset);
			original &= ~(mask << unit_bit_offset);
			original |= tmp_view.getUint8(0) << unit_bit_offset;
			this.#dataview.setUint8(unit_offset, original);
		}
	}

	setInt16(bitOffset, value, littleEndian, bitCount = 16)
	{
		let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
		let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

		let mask = ((0x01 << bitCount)-1);
		value &= mask;

		let val_array = new ArrayBuffer(3);
		let val_view = new DataView(val_array);
		val_view.setInt16(0,value,littleEndian);

		let mask_array = new ArrayBuffer(3);
		let mask_view = new DataView(mask_array);
		mask_view.setUint16(0,mask,littleEndian);

		if((unit_bit_offset + bitCount) > 16)
		{
			let original_16 = this.#dataview.getUint16(unit_offset,true);
			let original_8 = this.#dataview.getUint16(unit_offset+1,true);
			original_16 &= ~(mask_view.getUint16(0,true) << unit_bit_offset);
			original_8 &= ~(mask_view.getUint16(1,true) << unit_bit_offset);

			original_16 |= val_view.getUint16(0,true) << unit_bit_offset;
			original_8 |= val_view.getUint16(1,true) << unit_bit_offset;

			this.#dataview.setUint8(unit_offset+1,original_8,true);
			this.#dataview.setUint16(unit_offset,original_16,true);
		}
		else
		{
			let original = this.#dataview.getUint16(unit_offset, true);
			original &= ~(mask_view.getUint16(0,true) << unit_bit_offset);
			original |= val_view.getUint16(0,true) << unit_bit_offset;
			this.#dataview.setUint16(unit_offset, original, true);
		}
	}

	setUint16(bitOffset, value, littleEndian, bitCount = 16)
	{
		let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
		let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

		let mask = ((0x01 << bitCount)-1);
		value &= mask;

		let val_array = new ArrayBuffer(3);
		let val_view = new DataView(val_array);
		val_view.setUint16(0,value,littleEndian);

		let mask_array = new ArrayBuffer(3);
		let mask_view = new DataView(mask_array);
		mask_view.setUint16(0,mask,littleEndian);

		if((unit_bit_offset + bitCount) > 16)
		{
			let original_16 = this.#dataview.getUint16(unit_offset,true);
			let original_8 = this.#dataview.getUint16(unit_offset+1,true);
			original_16 &= ~(mask_view.getUint16(0,true) << unit_bit_offset);
			original_8 &= ~(mask_view.getUint16(1,true) << unit_bit_offset);

			original_16 |= val_view.getUint16(0,true) << unit_bit_offset;
			original_8 |= val_view.getUint16(1,true) << unit_bit_offset;

			this.#dataview.setUint8(unit_offset+1,original_8,true);
			this.#dataview.setUint16(unit_offset,original_16,true);
		}
		else
		{
			let original = this.#dataview.getUint16(unit_offset, true);
			original &= ~(mask_view.getUint16(0,true) << unit_bit_offset);
			original |= val_view.getUint16(0,true) << unit_bit_offset;
			this.#dataview.setUint16(unit_offset, original, true);
		}
	}

	setInt32(bitOffset, value, littleEndian, bitCount = 32)
	{
		let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
		let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

		let mask = ((0x01 << bitCount)-1);

		if(bitcount > 31)
		{
			mask = 0xFFFFFFFF;
		}

		value &= mask;

		let val_array = new ArrayBuffer(5);
		let val_view = new DataView(val_array);
		val_view.setInt32(0,value,littleEndian);

		let mask_array = new ArrayBuffer(5);
		let mask_view = new DataView(mask_array);
		mask_view.setUint32(0,mask,littleEndian);

		if((unit_bit_offset + bitCount) > 32)
		{
			let original_32 = this.#dataview.getUint32(unit_offset,true);
			let original_16 = this.#dataview.getUint16(unit_offset+3,true);
			original_32 &= ~(mask_view.getUint32(0,true) << unit_bit_offset);
			original_16 &= ~(mask_view.getUint16(3,true) << unit_bit_offset);

			original_32 |= val_view.getUint32(0,true) << unit_bit_offset;
			original_16 |= val_view.getUint16(3,true) << unit_bit_offset;

			this.#dataview.setUint16(unit_offset+3,original_16,true);
			this.#dataview.setUint32(unit_offset,original_32,true);
		}
		else
		{
			let original = this.#dataview.getUint32(unit_offset, true);
			original &= ~(mask_view.getUint32(0,true) << unit_bit_offset);
			original |= val_view.getUint32(0,true) << unit_bit_offset;
			this.#dataview.setUint32(unit_offset, original, true);
		}
	}

	setUint32(bitOffset, value, littleEndian, bitCount = 32)
	{
		let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
		let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

		let mask = ((0x01 << bitCount)-1);

		if(bitCount > 31)
		{
			mask = 0xFFFFFFFF;
		}

		value &= mask;

		let val_array = new ArrayBuffer(5);
		let val_view = new DataView(val_array);
		val_view.setUint32(0,value,littleEndian);

		let mask_array = new ArrayBuffer(5);
		let mask_view = new DataView(mask_array);
		mask_view.setUint32(0,mask,littleEndian);

		if((unit_bit_offset + bitCount) > 32)
		{
			let original_32 = this.#dataview.getUint32(unit_offset,true);
			let original_16 = this.#dataview.getUint16(unit_offset+3,true);
			original_32 &= ~(mask_view.getUint32(0,true) << unit_bit_offset);
			original_16 &= ~(mask_view.getUint16(3,true) << unit_bit_offset);

			original_32 |= val_view.getUint32(0,true) << unit_bit_offset;
			original_16 |= val_view.getUint16(3,true) << unit_bit_offset;

			this.#dataview.setUint16(unit_offset+3,original_16,true);
			this.#dataview.setUint32(unit_offset,original_32,true);
		}
		else
		{
			let original = this.#dataview.getUint32(unit_offset, true);
			original &= ~(mask_view.getUint32(0,true) << unit_bit_offset);
			original |= val_view.getUint32(0,true) << unit_bit_offset;
			this.#dataview.setUint32(unit_offset, original, true);
		}
	}

	setFloat32(bitOffset, value, littleEndian)
	{
		let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
		let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;
		let mask = 0xFFFFFFFF;

		let val_array = new ArrayBuffer(5);
		let val_view = new DataView(val_array);
		val_view.setFloat32(0,value,littleEndian);

		let mask_array = new ArrayBuffer(5);
		let mask_view = new DataView(mask_array);
		mask_view.setUint32(0,mask,littleEndian);

		if((unit_bit_offset + 32) > 32)
		{
			let original_32 = this.#dataview.getUint32(unit_offset,true);
			let original_16 = this.#dataview.getUint16(unit_offset+3,true);
			original_32 &= ~(mask_view.getUint32(0,true) << unit_bit_offset);
			original_16 &= ~(mask_view.getUint16(3,true) << unit_bit_offset);

			original_32 |= val_view.getUint32(0,true) << unit_bit_offset;
			original_16 |= val_view.getUint16(3,true) << unit_bit_offset;

			this.#dataview.setUint16(unit_offset+3,original_16,true);
			this.#dataview.setUint32(unit_offset,original_32,true);
		}
		else
		{
			let original = this.#dataview.getUint32(unit_offset, true);
			original &= ~(mask_view.getUint32(0,true) << unit_bit_offset);
			original |= val_view.getUint32(0,true) << unit_bit_offset;
			this.#dataview.setUint32(unit_offset, original, true);
		}
	}

//////////////////////////////////////////
// GET ARRAY
//////////////////////////////////////////

	getBoolArray(bitOffset,bitlength)
	{
		let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
		let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;
		let result = [];
		let data = this.#dataview.getUint8(unit_offset);

		for(let i = 0; i < bitlength;i++)
		{
			if(unit_bit_offset > 7)
			{
				unit_bit_offset = 0;
				unit_offset++;
				data = this.#dataview.getUint8(unit_offset);
			}
			if(data & (0x01 << unit_bit_offset))
			{
				result.push(true);
			}
			else
			{
				result.push(false);
			}
			unit_bit_offset++;
		}
		return result;
	}

	getInt8Array(bitOffset=0, length, bitCount = 8)
	{
		let tmp_array = new ArrayBuffer(2);
		let tmp_view = new DataView(tmp_array);

		bitOffset += this.#bit_offset;

		let result = [];
		for(let i = 0; i < length; i++)
		{
			let unit_offset = bitOffset >> 3;
			let unit_bit_offset = bitOffset & 7;

			if((unit_bit_offset + bitCount) > 8)
			{
				let data_16 = this.#dataview.getUint16(unit_offset,true);
				tmp_view.setUint16(0,data_16 >> unit_bit_offset,true);
			}
			else
			{
				let data_8 = this.#dataview.getUint8(unit_offset,true);
				tmp_view.setUint16(0, data_8 >> unit_bit_offset,true);
			}

			result.push((tmp_view.getInt8(0) << (32 - bitCount)) >> (32 - bitCount));
			bitOffset += bitCount;
		}
		return result;
	}

	getUint8Array(bitOffset=0, length, bitCount = 8)
	{
		let tmp_array = new ArrayBuffer(2);
		let tmp_view = new DataView(tmp_array);

		bitOffset += this.#bit_offset;

		let result = [];
		for(let i = 0; i < length; i++)
		{
			let unit_offset = bitOffset >> 3;
			let unit_bit_offset = bitOffset & 7;

			if((unit_bit_offset + bitCount) > 8)
			{
				let data_16 = this.#dataview.getUint16(unit_offset,true);
				tmp_view.setUint16(0,data_16 >> unit_bit_offset,true);
			}
			else
			{
				let data_8 = this.#dataview.getUint8(unit_offset,true);
				tmp_view.setUint16(0, data_8 >> unit_bit_offset,true);
			}

			result.push(tmp_view.getUint8(0) & ((0x01 << bitCount)-1));
			bitOffset += bitCount;
		}
		return result;
	}

	getInt16Array(bitOffset=0, length, littleEndian, bitCount = 16)
	{
		let tmp_array = new ArrayBuffer(4);
		let tmp_view = new DataView(tmp_array);

		bitOffset += this.#bit_offset;

		let result = [];
		for(let i = 0; i < length; i++)
		{
			let unit_offset = bitOffset >> 3;
			let unit_bit_offset = bitOffset & 7;

			if((unit_bit_offset + bitCount) > 16)
			{
				let data_32 = this.#dataview.getUint32(unit_offset,true);
				tmp_view.setUint32(0,data_32 >> unit_bit_offset,true);
			}
			else
			{
				let data_16 = this.#dataview.getUint16(unit_offset,true);
				tmp_view.setUint32(0,data_16 >> unit_bit_offset,true);
			}

			result.push((tmp_view.getInt16(0, littleEndian) << (32 - bitCount)) >> (32 - bitCount));
			bitOffset += bitCount;
		}
		return result;
	}

	getUint16Array(bitOffset=0, length, littleEndian, bitCount = 16)
	{
		let tmp_array = new ArrayBuffer(4);
		let tmp_view = new DataView(tmp_array);

		bitOffset += this.#bit_offset;

		let result = [];
		for(let i = 0; i < length; i++)
		{
			let unit_offset = bitOffset >> 3;
			let unit_bit_offset = bitOffset & 7;

			if((unit_bit_offset + bitCount) > 16)
			{
				let data_32 = this.#dataview.getUint32(unit_offset,true);
				tmp_view.setUint32(0,data_32 >> unit_bit_offset,true);
			}
			else
			{
				let data_16 = this.#dataview.getUint16(unit_offset,true);
				tmp_view.setUint32(0,data_16 >> unit_bit_offset,true);
			}

			result.push(tmp_view.getUint16(0, littleEndian) & ((0x01 << bitCount)-1));
			bitOffset += bitCount;
		}
		return result;
	}

	getInt32Array(bitOffset=0, length, littleEndian, bitCount = 32)
	{
		let tmp_array = new ArrayBuffer(5);
		let tmp_view = new DataView(tmp_array);

		bitOffset += this.#bit_offset;

		let result = [];
		for(let i = 0; i < length; i++)
		{
			let unit_offset = bitOffset >> 3;
			let unit_bit_offset = bitOffset & 7;

			if((unit_bit_offset + bitCount) > 32)
			{
				let data_32 = this.#dataview.getUint32(unit_offset,true);
				let data_16 = this.#dataview.getUint16(unit_offset+3,true);
				tmp_view.setUint32(0,data_32 >> unit_bit_offset,true);
				tmp_view.setUint16(3,data_16 >> unit_bit_offset,true);
			}
			else
			{
				let data_32 = this.#dataview.getUint32(unit_offset,true);
				tmp_view.setUint32(0,data_32 >> unit_bit_offset,true);
			}

			result.push((tmp_view.getInt32(0, littleEndian) << (32 - bitCount)) >> (32 - bitCount));
			bitOffset += bitCount;
		}
		return result;
	}

	getUint32Array(bitOffset=0, length, littleEndian, bitCount = 32)
	{
		let tmp_array = new ArrayBuffer(5);
		let tmp_view = new DataView(tmp_array);

		bitOffset += this.#bit_offset;

		let result = [];
		for(let i = 0; i < length; i++)
		{
			let unit_offset = bitOffset >> 3;
			let unit_bit_offset = bitOffset & 7;

			if((unit_bit_offset + bitCount) > 32)
			{
				let data_32 = this.#dataview.getUint32(unit_offset,true);
				let data_16 = this.#dataview.getUint16(unit_offset+3,true);
				tmp_view.setUint32(0,data_32 >> unit_bit_offset,true);
				tmp_view.setUint16(3,data_16 >> unit_bit_offset,true);
			}
			else
			{
				let data_32 = this.#dataview.getUint32(unit_offset,true);
				tmp_view.setUint32(0,data_32 >> unit_bit_offset,true);
			}

			if(bitCount > 31)
			{
				result.push(tmp_view.getUint32(0, littleEndian));
			}
			else
			{
				result.push(tmp_view.getUint32(0, littleEndian) & ((0x01 << bitCount)-1));
			}
			bitOffset += bitCount;
		}
		return result;
	}

	getFloat32Array(bitOffset=0, length, littleEndian)
	{
		let tmp_array = new ArrayBuffer(5);
		let tmp_view = new DataView(tmp_array);

		bitOffset += this.#bit_offset;

		let result = [];
		for(let i = 0; i < length; i++)
		{
			let unit_offset = bitOffset >> 3;
			let unit_bit_offset = bitOffset & 7;

			if((unit_bit_offset + bitCount) > 32)
			{
				let data_32 = this.#dataview.getUint32(unit_offset,true);
				let data_16 = this.#dataview.getUint16(unit_offset+3,true);
				tmp_view.setUint32(0,data_32 >> unit_bit_offset,true);
				tmp_view.setUint16(3,data_16 >> unit_bit_offset,true);
			}
			else
			{
				let data_32 = this.#dataview.getUint32(unit_offset,true);
				tmp_view.setUint32(0,data_32 >> unit_bit_offset,true);
			}

			result.push(tmp_view.getFloat32(0, littleEndian));
			bitOffset += bitCount;
		}
		return result;
	}

//////////////////////////////////////////
// SET ARRAY
//////////////////////////////////////////

	setBoolArray(bitOffset, bitlength, value)
	{
		let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
		let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;
		let data = this.#dataview.getUint8(unit_offset);

		for(let i = 0; i < bitlength;i++)
		{
			if(unit_bit_offset > 7)
			{
				this.#dataview.setUint8(unit_offset,data);
				unit_bit_offset = 0;
				unit_offset++;
				data = this.#dataview.getUint8(unit_offset);
			}
			if(value[i] == true)
			{
				data |= (0x01 << unit_bit_offset);
			}
			else
			{
				data &= ~(0x01 << unit_bit_offset);
			}
			unit_bit_offset++;
		}
		this.#dataview.setUint8(unit_offset,data);
	}

	setInt8Array(bitOffset=0, length, value, bitCount = 8)
	{
		let tmp_array = new ArrayBuffer(1);
		let tmp_view = new DataView(tmp_array);
		let mask = ((0x01 << bitCount)-1);

		for(let i = 0; i < length; i++)
		{
			let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
			let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

			value[i] &= mask;
			tmp_view.setInt8(0,value[i]);

			if((unit_bit_offset + bitCount) > 8)
			{
				let original = this.#dataview.getUint16(unit_offset, true);
				original &= ~(mask << unit_bit_offset);
				original |= tmp_view.getUint8(0,true) << unit_bit_offset;
				this.#dataview.setUint16(unit_offset, original, true);
			}
			else
			{
				let original = this.#dataview.getUint8(unit_offset);
				original &= ~(mask << unit_bit_offset);
				original |= tmp_view.getUint8(0) << unit_bit_offset;
				this.#dataview.setUint8(unit_offset, original);
			}
			bitOffset += bitCount;
		}
	}

	setUint8Array(bitOffset=0, length, value, bitCount = 8)
	{
		let tmp_array = new ArrayBuffer(1);
		let tmp_view = new DataView(tmp_array);
		let mask = ((0x01 << bitCount)-1);

		for(let i = 0; i < length; i++)
		{
			let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
			let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

			value[i] &= mask;
			tmp_view.setUint8(0,value[i]);

			if((unit_bit_offset + bitCount) > 8)
			{
				let original = this.#dataview.getUint16(unit_offset, true);
				original &= ~(mask << unit_bit_offset);
				original |= tmp_view.getUint8(0,true) << unit_bit_offset;
				this.#dataview.setUint16(unit_offset, original, true);
			}
			else
			{
				let original = this.#dataview.getUint8(unit_offset);
				original &= ~(mask << unit_bit_offset);
				original |= tmp_view.getUint8(0) << unit_bit_offset;
				this.#dataview.setUint8(unit_offset, original);
			}
			bitOffset += bitCount;
		}
	}

	setInt16Array(bitOffset=0, length, value, littleEndian, bitCount = 16)
	{
		let val_array = new ArrayBuffer(3);
		let val_view = new DataView(val_array);

		let mask_array = new ArrayBuffer(3);
		let mask_view = new DataView(mask_array);

		let mask = ((0x01 << bitCount)-1);

		for(let i = 0; i < length; i++)
		{
			let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
			let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

			value[i] &= mask;

			val_view.setUInt16(0,value[i],littleEndian);

			mask_view.setUint16(0,mask,littleEndian);

			if((unit_bit_offset + bitCount) > 16)
			{
				let original_16 = this.#dataview.getUint16(unit_offset,true);
				let original_8 = this.#dataview.getUint16(unit_offset+1,true);
				original_16 &= ~(mask_view.getUint16(0,true) << unit_bit_offset);
				original_8 &= ~(mask_view.getUint16(1,true) << unit_bit_offset);

				original_16 |= val_view.getUint16(0,true) << unit_bit_offset;
				original_8 |= val_view.getUint16(1,true) << unit_bit_offset;

				this.#dataview.setUint8(unit_offset+1,original_8,true);
				this.#dataview.setUint16(unit_offset,original_16,true);
			}
			else
			{
				let original = this.#dataview.getUint16(unit_offset, true);
				original &= ~(mask_view.getUint16(0,true) << unit_bit_offset);
				original |= val_view.getUint16(0,true) << unit_bit_offset;
				this.#dataview.setUint16(unit_offset, original, true);
			}
			bitOffset += bitCount;
		}
	}

	setUint16Array(bitOffset=0, length, value, littleEndian, bitCount = 16)
	{

		let val_array = new ArrayBuffer(3);
		let val_view = new DataView(val_array);

		let mask_array = new ArrayBuffer(3);
		let mask_view = new DataView(mask_array);

		let mask = ((0x01 << bitCount)-1);

		for(let i = 0; i < length; i++)
		{
			let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
			let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

			value[i] &= mask;

			val_view.setInt16(0,value[i],littleEndian);

			mask_view.setUint16(0,mask,littleEndian);

			if((unit_bit_offset + bitCount) > 16)
			{
				let original_16 = this.#dataview.getUint16(unit_offset,true);
				let original_8 = this.#dataview.getUint16(unit_offset+1,true);
				original_16 &= ~(mask_view.getUint16(0,true) << unit_bit_offset);
				original_8 &= ~(mask_view.getUint16(1,true) << unit_bit_offset);

				original_16 |= val_view.getUint16(0,true) << unit_bit_offset;
				original_8 |= val_view.getUint16(1,true) << unit_bit_offset;

				this.#dataview.setUint8(unit_offset+1,original_8,true);
				this.#dataview.setUint16(unit_offset,original_16,true);
				
			}
			else
			{
				let original = this.#dataview.getUint16(unit_offset, true);
				original &= ~(mask_view.getUint16(0,true) << unit_bit_offset);
				original |= val_view.getUint16(0,true) << unit_bit_offset;
				this.#dataview.setUint16(unit_offset, original, true);
			}
			bitOffset += bitCount;
		}
	}

	setInt32Array(bitOffset=0, length, value, littleEndian, bitCount = 32)
	{
		let val_array = new ArrayBuffer(5);
		let val_view = new DataView(val_array);

		let mask_array = new ArrayBuffer(5);
		let mask_view = new DataView(mask_array);

		let mask = ((0x01 << bitCount)-1);

		if(bitcount > 31)
		{
			mask = 0xFFFFFFFF;
		}

		for(let i = 0; i < length; i++)
		{
			let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
			let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

			value[i] &= mask;

			val_view.setInt32(0,value[i],littleEndian);

			mask_view.setUint32(0,mask,littleEndian);

			if((unit_bit_offset + bitCount) > 32)
			{
				let original_32 = this.#dataview.getUint32(unit_offset,true);
				let original_16 = this.#dataview.getUint16(unit_offset+3,true);
				original_32 &= ~(mask_view.getUint32(0,true) << unit_bit_offset);
				original_16 &= ~(mask_view.getUint16(3,true) << unit_bit_offset);

				original_32 |= val_view.getUint32(0,true) << unit_bit_offset;
				original_16 |= val_view.getUint16(3,true) << unit_bit_offset;

				this.#dataview.setUint16(unit_offset+3,original_16,true);
				this.#dataview.setUint32(unit_offset,original_32,true);
			}
			else
			{
				let original = this.#dataview.getUint32(unit_offset, true);
				original &= ~(mask_view.getUint32(0,true) << unit_bit_offset);
				original |= val_view.getUint32(0,true) << unit_bit_offset;
				this.#dataview.setUint32(unit_offset, original, true);
			}
			bitOffset += bitCount;
		}
	}

	setUint32Array(bitOffset=0, length, value, littleEndian, bitCount = 32)
	{
		let val_array = new ArrayBuffer(5);
		let val_view = new DataView(val_array);

		let mask_array = new ArrayBuffer(5);
		let mask_view = new DataView(mask_array);

		let mask = ((0x01 << bitCount)-1);

		if(bitCount > 31)
		{
			mask = 0xFFFFFFFF;
		}

		for(let i = 0; i < length; i++)
		{
			let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
			let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

			value[i] &= mask;

			val_view.setUint32(0,value[i],littleEndian);

			mask_view.setUint32(0,mask,littleEndian);

			if((unit_bit_offset + bitCount) > 32)
			{
				let original_32 = this.#dataview.getUint32(unit_offset,true);
				let original_16 = this.#dataview.getUint16(unit_offset+3,true);
				original_32 &= ~(mask_view.getUint32(0,true) << unit_bit_offset);
				original_16 &= ~(mask_view.getUint16(3,true) << unit_bit_offset);

				original_32 |= val_view.getUint32(0,true) << unit_bit_offset;
				original_16 |= val_view.getUint16(3,true) << unit_bit_offset;

				this.#dataview.setUint16(unit_offset+3,original_16,true);
				this.#dataview.setUint32(unit_offset,original_32,true);
			}
			else
			{
				let original = this.#dataview.getUint32(unit_offset, true);
				original &= ~(mask_view.getUint32(0,true) << unit_bit_offset);
				original |= val_view.getUint32(0,true) << unit_bit_offset;
				this.#dataview.setUint32(unit_offset, original, true);
			}
			bitOffset += bitCount;
		}
	}

	setFloat32Array(bitOffset=0, length, value, littleEndian)
	{
		let val_array = new ArrayBuffer(5);
		let val_view = new DataView(val_array);

		let mask_array = new ArrayBuffer(5);
		let mask_view = new DataView(mask_array);

		mask = 0xFFFFFFFF;

		for(let i = 0; i < length; i++)
		{
			let unit_offset = ((bitOffset + this.#bit_offset) >> 3);
			let unit_bit_offset = (bitOffset + this.#bit_offset) & 7;

			val_view.setFloat32(0,value[i],littleEndian);

			mask_view.setUint32(0,mask,littleEndian);

			if((unit_bit_offset + bitCount) > 32)
			{
				let original_32 = this.#dataview.getUint32(unit_offset,true);
				let original_16 = this.#dataview.getUint16(unit_offset+3,true);
				original_32 &= ~(mask_view.getUint32(0,true) << unit_bit_offset);
				original_16 &= ~(mask_view.getUint16(3,true) << unit_bit_offset);

				original_32 |= val_view.getUint32(0,true) << unit_bit_offset;
				original_16 |= val_view.getUint16(3,true) << unit_bit_offset;

				this.#dataview.setUint16(unit_offset+3,original_16,true);
				this.#dataview.setUint32(unit_offset,original_32,true);
			}
			else
			{
				let original = this.#dataview.getUint32(unit_offset, true);
				original &= ~(mask_view.getUint32(0,true) << unit_bit_offset);
				original |= val_view.getUint32(0,true) << unit_bit_offset;
				this.#dataview.setUint32(unit_offset, original, true);
			}
			bitOffset += bitCount;
		}
	}
}