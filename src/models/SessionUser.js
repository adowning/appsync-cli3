/*
string:       value(s) must be a string, additional optional constraints in typeOptions
ip_address:   value(s) must be a valid IP address(v4 or v6)
integer:      value(s) must be a valid integer, additional optional constraints in typeOptions
numeric:      value(s) must be a valid number, additional optional constraints in typeOptions
geo_point:    value(s) must be a valid geo-point
geo_shape:    value(s) must be a valid geo-shape
date:         value(s) must be a valid date, additional optional constraints in typeOptions
object:       value(s) must be a valid object, additional optional constraints in typeOptions
Possible      values (Special types):

email: value(s) must be a valid email address, additional optional constraints in typeOptions
url: value(s) must be a valid url
enum: (string) value(s) must be contained in the valid values, additional mandatory configuration in typeOptions
anything: value(s) can be of any type(useful to specify a mandatory or multi - valued field without any other constraints, or when you use the strict option)
*/
export default () => {
  return {
    id: undefined,
    token: undefined,
    params: {},
    rights: []
  };
}
/*
{
  device:
  {

    "deviceId": { "type": "text" },
    "currentOwner": { "type": "text" },
    "currentUserList": { "type": "object" },
    "lastLocation": { "type": "geo_point" }

  }
}
{
  "birthday" : { "type": "number"},
  "birthmonth" : { "type": "number"},
  "cellphone" : { "type": "number"},
  "hiredate" : { "type": "date"},
  "firstname" : { "type": "string"},
  "lastname" : { "type": "string"},
  "photo_url" : { "type": "string"},
  "wage" : { "type": "number"},
  "lastactive" : { "type": "date"},
}
*/
