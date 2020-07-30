package cs.model;
import org.hibernate.annotations.GenericGenerator;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import javax.persistence.*;

@Entity
@Table(name = "files")
public class Image {
    
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String uuid;
    
	
    private String fileName;

    private String fileType;
    
    @OneToOne(mappedBy = "img")
    private Recipe recipe;
    
    @Lob
    @Column(name="img", nullable=false, columnDefinition="mediumblob")
    private byte[] data;

    public Image() {

    }

    public Image(String fileName, String fileType, byte[] data) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.data = data;
    }

	public String getId() {
		return uuid;
	}

	public void setId(String id) {
		this.uuid = id;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}
}
