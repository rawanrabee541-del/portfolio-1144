<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $booking = [
        'id' => uniqid(),
        'name' => $_POST['name'],
        'phone' => $_POST['phone'],
        'department' => $_POST['department'],
        'date' => $_POST['date'],
        'complaint' => $_POST['complaint'],
        'created_at' => date('Y-m-d H:i:s'),
        'status' => 'pending'
    ];
    
    $file = 'appointments.json';
    $current_data = file_exists($file) ? file_get_contents($file) : '[]';
    $array_data = json_decode($current_data, true);
    $array_data[] = $booking;
    file_put_contents($file, json_encode($array_data, JSON_PRETTY_PRINT));
    
    echo "<script>alert('تم حجز موعدك بنجاح! رقم الحجز: ".$booking['id']."'); window.location.href='index.html';</script>";
}
?>