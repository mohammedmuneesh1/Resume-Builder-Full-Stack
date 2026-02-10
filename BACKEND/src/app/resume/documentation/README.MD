// 1)  Object.assign()

Great question — yes, Object.assign() merges the incoming data (req.body) into the existing resume document (isResumeExist), but here’s the simple explanation:

✅ What Object.assign(isResumeExist, req.body) does
👉 It takes all fields from req.body

and

👉 copies/overwrites them onto isResumeExist (the MongoDB document).

So if your resume schema looks like:

{
  fullName: "",
  designation: "",
  summary: "",
  profileImg: "",
  version: 1,
}


And the user sends:

{
  "designation": "Senior Developer",
  "summary": "Updated summary"
}


Then after Object.assign():

isResumeExist = {
  fullName: "",             // unchanged
  designation: "Senior Developer", // updated
  summary: "Updated summary",      // updated
  profileImg: "",           // unchanged
  version: 1                // unchanged unless overwritten
}

❗ Important: It only updates fields that are already defined in the schema

Object.assign() does NOT change your schema.

It does not create new schema fields

It does not remove fields

It simply updates the existing Mongoose document with whatever properties exist in req.body.

Mongoose still respects the schema during .save():

Extra fields not in the schema are ignored (unless strict:false)

Required fields must still satisfy validation

maxlength, trim, etc. still work




