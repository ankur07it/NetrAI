const path = require('path');
const os = require('os');
const fs = require('fs');
const multer  = require('multer')

const functions = require('@google-cloud/functions-framework');

const Busboy = require('busboy');

functions.http('helloHttp', (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  const busboy = Busboy({headers: req.headers});
  const tmpdir = os.tmpdir();
  // This object will accumulate all the fields, keyed by their name
  const fields = {};
  // This object will accumulate all the uploaded files, keyed by their name.
  const uploads = {};
  // This code will process each non-file field in the form.
  busboy.on('field', (fieldname, val) => {
    /**
     *  TODO(developer): Process submitted field values here
     */
    console.log(`Processed field ${fieldname}: ${val}.`);
    fields[fieldname] = val;
  });
  var  buf = '';
  // This code will process each file uploaded.
  busboy.on('file', (fieldname, file, {filename}) => {
    // Note: os.tmpdir() points to an in-memory file system on GCF
    // Thus, any files in it must fit in the instance's memory.
    console.log(`Processed file ${filename}`);
    const filepath = path.join(tmpdir, filename);
    uploads[fieldname] = filepath;

    console.log('Reading File');
    var archivo = file.createReadStream();
    console.log('Concat Data');
    archivo.on('data', function(d) {
        buf += d;
    }).on('end', function() {
        console.log(buf);
        console.log("End");
    });  

    // const writeStream = fs.createWriteStream(filepath);
    // file.pipe(writeStream);

    // File was processed by Busboy; wait for it to be written.
    // Note: GCF may not persist saved files across invocations.
    // Persistent files must be kept in other locations
    // (such as Cloud Storage buckets).
    // const promise = new Promise((resolve, reject) => {
    //   file.on('end', () => {
    //     writeStream.end();
    //   });
    //   writeStream.on('close', resolve);
    //   writeStream.on('error', reject);
    // });
    // fileWrites.push(promise);
  });

  // Triggered once all uploaded files are processed by Busboy.
  // We still need to wait for the disk writes (saves) to complete.
  busboy.on('finish', async () => {
    await Promise.all(buf);

    /**
     * TODO(developer): Process saved files here
     */
    for (const file in uploads) {
      fs.unlinkSync(uploads[file]);
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(buf);
  });

  busboy.end(req.rawBody);
});
// [END functions_http_form_data]


https://www.cs.virginia.edu/~up3f/cs4640/supplement/angular-deployment.html
