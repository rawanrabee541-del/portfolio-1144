<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $patient_id = $_POST['patient_id'];
    $password = $_POST['password'];
    
    // بيانات تجريبية - في الحقيقة هتجيبها من قاعدة بيانات
    $users = [
        ['id' => '12345', 'pass' => '123456', 'name' => 'أحمد محمد'],
        ['id' => '67890', 'pass' => '123456', 'name' => 'فاطمة علي']
    ];
    
    foreach($users as $user) {
        if($user['id'] === $patient_id && $user['pass'] === $password) {
            $_SESSION['patient'] = $user['name'];
            header('Location: patient.html');
            exit();
        }
    }
    echo "<script>alert('رقم الملف أو كلمة المرور غلط'); window.location.href='login.html';</script>";
}
?>