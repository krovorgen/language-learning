```
db.dictionary.find().forEach(function(doc) {
    db.dictionary_test.insertMany([doc])
})
```
for copy db
