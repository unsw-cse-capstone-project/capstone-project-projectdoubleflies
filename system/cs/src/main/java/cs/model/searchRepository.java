package cs.model;
import java.util.List;
import cs.model.SearchHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigInteger;

@Repository
public interface searchRepository extends JpaRepository<SearchHistory, Long>{
    @Query(value="SELECT s.ingredient from searchistory_Info s WHERE s.searchid=:searchid",nativeQuery=true)
    List<String> history(@Param("searchid") BigInteger searchid);
	
    @Query("select s from SearchHistory s where s.searchID=?1")
    SearchHistory test(Long id);
    
    @Query(value = "select * from search_history order by frequency desc", nativeQuery=true)
    List<SearchHistory> help();
	
    @Query(value ="select * from SearchHistory s where s.meal=?1",nativeQuery=true)
    SearchHistory helpme(String ingredient);

    @Query(value="select searchID from searchHistory where searchID not in (select distinct(s.searchID) from searchistory_Info s where exists (select recipeID from ingredient_info r join searchistory_Info s1 on s1.ingredient=r.ingredient where s1.searchID=s.searchID group by r.recipeID having count(distinct r.ingredient)=(select count(distinct s2.ingredient) from searchistory_Info s2 where s2.searchID=s.searchID))) ORDER BY frequency DESC", nativeQuery = true)
    List<BigInteger> search_history();
    
    @Query(value="select v1.sid " + 
    		"from v1 " + 
    		"where v1.sid not in " + 
    		"( " + 
    		"select v1.sid from " + 
    		"( " + 
    		"(select si.searchid as sid, GROUP_CONCAT(si.ingredient order by si.ingredient ASC) as in1, sh.frequency as freq1 " + 
    		"from searchistory_Info si " + 
    		"join SearchHistory sh on (sh.searchid = si.searchid) " + 
    		"group by si.searchid) as v1," + 
    		"(select ii.recipeid as rid, GROUP_CONCAT(ii.ingredient order by ii.ingredient ASC) as in2 " + 
    		"from ingredient_info ii " + 
    		"group by ii.recipeid " + 
    		"order by ii.recipeid ASC) as v2 " + 
    		") " + 
    		"where concat(\",\", v2.in2, \",\") LIKE concat(\"%,\", replace(v1.in1, \",\" , \",%\"), \",%\") " + 
    		") " + 
    		"order by v1.freq1 DESC;", nativeQuery=true)
     BigInteger popularSearchNoMatch();


    //  @Query(value="select searchID from SearchHistory where searchID not in"
    // 		+ " (select distinct(s.searchID) from searchistory_Info s where exists "
    // 		+ "(select recipeID from ingredient_info r join searchistory_Info s1 on "
    // 		+ "s1.ingredient=r.ingredient where s1.searchID=s.searchID group by r.recipeID "
    // 		+ "having count(distinct r.ingredient)=(select count(distinct s2.ingredient) "
    // 		+ "from searchistory_Info s2 where s2.searchID=s.searchID))) ORDER BY frequency DESC", nativeQuery = true)
    // List<String> search_history();

}
