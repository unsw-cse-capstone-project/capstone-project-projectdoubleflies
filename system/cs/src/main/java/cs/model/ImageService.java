package cs.model;
import  cs.model.Image;
import  cs.model.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
public class ImageService {
	@Autowired
	private ImageRepository repo;
	
	public Image storeImage(MultipartFile file){
		 String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		 try {
	            Image img = new Image(fileName, file.getContentType(), file.getBytes());
	            return repo.save(img);
	        } catch (IOException ex) {
	        	ex.printStackTrace();
	        }
		return null;
		 
	}
	
	public Image getFile(String id) {
		return repo.findOne(id);
	}
	
	
               
}
