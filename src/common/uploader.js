



var accessid= 'LTAIsQ4Cd0g6zysP';
var accesskey= '4JqP5EN5MpQrz7eHZRdVOSPZpXrAD0';


var policyText = {
  "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
  "conditions": [
    ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
  ]
};

var policyBase64 = Base64.encode(JSON.stringify(policyText))
var message = policyBase64
var bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, { asBytes: true }) ;
var signature = Crypto.util.bytesToBase64(bytes);


export const uploader_init = (para) =>{

  var file_name = '';

  var host = 'https://xkjpicture.oss-cn-beijing.aliyuncs.com';


  function random_string(len) {
    len = len || 32;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }

  function get_suffix(filename) {
    var pos = filename.lastIndexOf('.')
    var suffix = ''
    if (pos != -1) {
      suffix = filename.substring(pos)
    }
    return suffix;
  }
  function calculate_object_name(filename) {
    var suffix = get_suffix(filename)
    file_name='head_'+ random_string(10)+suffix;
  }


  function set_upload_param(up, filename, ret) {

    if (filename != '') {
      calculate_object_name(filename)
    }

    var new_multipart_params = {
      'key': file_name,
      'policy': policyBase64,
      'OSSAccessKeyId': accessid,
      'success_action_status': '200', //让服务端返回200,不然，默认会返回204
      'signature': signature
    };
    up.setOption({
      'url': host,
      'multipart_params': new_multipart_params
    });
    up.start();
  }


  console.log('uploader init')
  var uploader = new plupload.Uploader({
    runtimes: 'html5,flash,silverlight,html4',
    browse_button: para.id,
    flash_swf_url: 'lib/plupload-2.1.2/js/Moxie.swf',
    silverlight_xap_url: 'lib/plupload-2.1.2/js/Moxie.xap',
    url: 'http://oss.aliyuncs.com',
    filters: {
      mime_types: [ //只允许上传图片
        {title: "Image files", extensions: "jpg,gif,png,bmp"}
      ],
      max_file_size: '10mb', //最大只能上传10mb的文件
      prevent_duplicates: true //不允许选取重复文件
    },
    init: {
      FilesAdded: function (up, files) {
        plupload.each(files, function (file) {
          set_upload_param(uploader, file.name, false);
        });
      },
      FileUploaded: function (up, file, info) {
        if (info.status == 200) {

          if(para.sc)
            para.sc(file_name);
        }
        else if (info.status == 203) {
        }
        else {
        }
      },
      Error: function (up, err) {
        if (err.code == -600) {
        } else if (err.code == -601) {
        } else if (err.code == -602) {
        } else {
        }
      }
    }
  });

  uploader.init();

}
































