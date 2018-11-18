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
  user id = id of doc = humanity id
  "birthday" : { "type": "integer"},
  "birthmonth" : { "type": "integer"},
  "cellphone" : { "type": "integer"},
  "hiredate" : { "type": "date"},
  "firstname" : { "type": "string"},
  "lastname" : { "type": "string"},
  "photo_url" : { "type": "string"},
  "wage" : { "type": "number"},
  "lastactive" : { "type": "date"},
}
  /* eventStamps are for each and everytime a change is made it gets recorded with the change
  eventstamsp record deviceId, time and geolocation if possible.
  break events are simply named eventstamps that get calculated, first is always out last is always in

  id (auto generated)
  userId same as above string
 {
  "userId" : { "type": "string"},
  "startTime" : { "type": "date"},
  "endTime" : { "type": "date"},
  "breakEvents" : { "type": "object"},
  "breakTimeTotal" : { "type": "integer"},
  "totalTime" : { "type": "integer"},
  "approved" : { "type": "boolean"},
  "approvedBy" : { "type": "string"},
  "notes" : { "type": "object"},
  "eventStamps" : { "type": "object"},
  "anomalies" : { "type": "object"}
 }



}
*/
