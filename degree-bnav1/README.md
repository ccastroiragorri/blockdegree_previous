# degree-bnav1

# Education Degree Network (registry)

> This is an interactive registry for educational achivements. List programs and degreee to be granted and registered to students.

This business network defines:

**Participant**
`Member`

**Asset**
`Program`
`Degree`

**Transaction**
`RecordDegree`

`Members` participants are able to obtain a `Degree` assets that is linked to another `Program` asset. Initially the degree is created for the `Member` administrator and then granted to a `Member` student using the `RecordDegree` transaction. The asset `Program` must be created before any of the other assets 'Degree' con be created.

To test this Business Network Definition in the **Test** tab:

Create two `Member` participant:

```
{
  "$class": "org.degree.Member",
  "email": "juan.uno@uni.edu",
  "firstName": "juan",
  "lastName": "uno"
}
```

```
{
  "$class": "org.degree.Member",
  "email": "admin@uni.edu",
  "firstName": "admin",
  "lastName": "econ"
}
```

Create a `Program` asset:

```
{
  "$class": "org.degree.Program",
  "progId": "01",
  "type": "Master",
  "university": "Uni",
  "department": "Economics",
  "oficialId": "2356"
}
```

Create a `Degree` asset:

```
{
  "$class": "org.degree.Degree",
  "degreeId": "1000",
  "title": "Master in Finance",
  "owner": "resource:org.degree.Member#admin@uni.edu",
  "prog": "resource:org.degree.Program#01"
}
```

Submit a `RecordDegree` transaction:

```
{
  "$class": "org.degree.RecordDegree",
  "titulo": "resource:org.degree.Degree#1000",
  "graduando": "resource:org.degree.Member#juan.uno@uni.edu"
}
```

This transaction has registered the degree `degreeId:1000` from `admin@uni.edu` to `juan.uno@uni.edu`.
