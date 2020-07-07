package cs.model;
import java.util.List;
import cs.model.SearchHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface searchRepository extends JpaRepository<SearchHistory, Long>{
    @Query(value="SELECT s.ingredient from searchistory_info s WHERE s.searchid=:searchid",nativeQuery=true)
    List<String> history(@Param("searchid") Long searchid);
	
    @Query("select s from SearchHistory s where s.searchID=?1")
    SearchHistory test(Long id);
    
    @Query(value = "select * from search_history order by frequency desc", nativeQuery=true)
    List<SearchHistory> help();
	
    @Query(value ="select * from SearchHistory s where s.meal=?1",nativeQuery=true)
    SearchHistory helpme(String ingredient);
}
