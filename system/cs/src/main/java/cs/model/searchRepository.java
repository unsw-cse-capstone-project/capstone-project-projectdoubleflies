package cs.model;
import java.util.List;
import cs.model.SearchHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface searchRepository extends JpaRepository<SearchHistory, Long>{
	
}
