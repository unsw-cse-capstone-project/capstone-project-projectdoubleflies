package cs.model;
import cs.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.io.IOException;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ImageController {
	private static final Logger logger = LoggerFactory.getLogger(ImageController.class);

    @Autowired
    private ImageService service;
    
   @Autowired
   ImageRepository imgRepository;

    @PostMapping("/uploadFile")
    public ResponseEntity uploadFile(@RequestParam("file") MultipartFile file) {
    	Image image = service.storeImage(file);
    	String fileName = StringUtils.cleanPath(file.getOriginalFilename());
    	Image img= new Image();
    	try {
    		img.setFileName(fileName);
        	img.setData(file.getBytes());
    	}catch (IOException e) {
    		e.printStackTrace();
    	}
    	
    	
    	String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/download/")
                .path(image.getId())
                .toUriString();

       return ResponseEntity.ok(fileDownloadUri);
    }
    
    @GetMapping("/download/{fileID}")
    public ResponseEntity<Resource> downloadFileFromLocal(@PathVariable String fileID) {
    	Image img = service.getFile(fileID);
    	return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(img.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + img.getFileName() + "\"")
                .body(new ByteArrayResource(img.getData()));
    }
    
    @DeleteMapping("/image/delete/{id}")
    public @ResponseBody String deleteImage(@PathVariable String id) {
		Image img = imgRepository.findOne(id);
		String name = img.getFileName();
		imgRepository.delete(id);
		return name+" is deleted";
    }
	
    
    
}
