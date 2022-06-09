<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers', 'Content-Type');
    header('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
    $id='';
    $r='';
    try{
        $db=new PDO('mysql:host=localhost;dbname=usersbd;charset:utf8','root','root');
    }catch(Exception $e){
        die("Error".$e->getMessage());
    }

    
    $method=$_SERVER['REQUEST_METHOD'];

    switch($method){
        case 'GET':
            if(isset($_GET["id"])){
                $id=$_GET["id"];
                //echo "<h1>". $id."</h1>";
            }
            $h=($id?'where id='.$id : ' ');

            $r=$db->prepare('SELECT * FROM usersinfo '.$h);
            //print_r ($r);
            break;
        case 'POST':
            $user=json_decode(file_get_contents('php://input'));
            
            $fname = $_POST["fname"];
            $lname = $_POST["lname"];
            $email = sha1($_POST["email"]);
            $password = sha1($_POST["password"]);
            $phone=sha1($_POST["phone"]);
            $nbrTable=$_POST["nbrTable"];
            if(isset($_GET["id"])){
                $id=$_GET["id"];
                $r=$db->prepare("UPDATE usersinfo set fname='$fname', lname='$lname', email='$email', password='$password',phone='$phone',nbrTable='$nbrTable' where id=$id");
                if($r->execute()){
                    $r=$db->prepare("select * from usersinfo where email='$email' and password='$password'");
                    $r2=$db->prepare("delete from tables where id=$id");
                    if($r->execute()){
                        $r2->execute();
                        $result=$r->fetchAll(PDO::FETCH_ASSOC);
                        if(count($result)>0){
                            $id=$result[0]["id"];
                            for($i=0;$i<$nbrTable;$i++){
                                $j=$i+1;
                                $r2=$db->prepare("insert into tables values($id,'http://localhost:3000/rest$id/tab$j',$j,0)");
                                $r2->execute();
                            }
                        }
                    }
                    $response=['status'=>1,'message'=>'Record created succes'];
                }
                else{
                    $response=['status'=>0,'message'=>'Failed created succes'];
                }
            }
            else if(isset($_GET["delete"])){
                $delete=$_GET["delete"];
                $r=$db->prepare("DELETE from usersinfo where id=$delete");
                if($r->execute()){
                    $response=['status'=>1,'message'=>'Record created succes'];
                }
                else{
                    $response=['status'=>0,'message'=>'Failed created succes'];
                }
            }
            else{
            
                $r=$db->prepare("insert into usersinfo values (null,'$fname', '$lname', '$email', '$password','$phone','$nbrTable')");
                if($r->execute()){
                    $r=$db->prepare("select * from usersinfo where email='$email' and password='$password' and phone='$phone'");
                    
                    if($r->execute()){
                        $result=$r->fetchAll(PDO::FETCH_ASSOC);
                        if(count($result)>0){
                            $id=$result[0]["id"];
                            $rMenu=$db->prepare("insert into menu values($id,null)");
                            $rMenu->execute();
                            for($i=0;$i<$nbrTable;$i++){
                                $j=$i+1;
                                $r2=$db->prepare("insert into tables values($id,'http://localhost:3000/rest$id/tab$j',$j,0)");
                                $r2->execute();
                            }
                        }

                    }
                    $response=['status'=>1,'message'=>'Record created succes'];
                }
                else{
                    $response=['status'=>0,'message'=>'Failed created succes'];
                }
            }
            
            echo json_encode($response);
            break;


    }
    
    

    
    if($method=='GET'){
        //echo "Yes";
        $r->execute();
        $users=$r->fetchAll(PDO::FETCH_ASSOC);
        //print_r($users);
        echo json_encode($users);
    }
    
?>