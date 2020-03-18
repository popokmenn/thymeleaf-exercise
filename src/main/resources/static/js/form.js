var Toast;
var count;
var currentIndex;

function test() {
	console.log("called");
}

function addRow() {
	var fullname = document.getElementById("fullname");
	var address = document.getElementById("address");
	var email = document.getElementById("email");
	var table = document.getElementById("form-table");

	var hobbies = getWord();
	var filteredHobbies = hobbies.filter(Boolean); //mem filter arr yang masih berisi '' / undefined

	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);

	if (document.getElementById("fullname").value.length > 0 && document.getElementById("address").value.length > 0 && document.getElementById("email").value.length > 0) {
		row.insertCell(0).innerHTML = fullname.value;
		row.insertCell(1).innerHTML = address.value
		row.insertCell(2).innerHTML = email.value;
		row.insertCell(3).innerHTML = filteredHobbies;
		row.insertCell(4).innerHTML = '<td><button onclick="modalUtil(this)" type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button></tr>'

		Toast.fire({
			type: 'success',
			title: fullname.value + '\'s form has been submitted successfully '
		});
		clearForm();

	} else {
		Toast.fire({
			type: 'error',
			title: 'Form is incomplete'
		});
	}
}

function getWord() {
	var checkBox = document.getElementById("cekBok1");
	var checkBox2 = document.getElementById("cekBok2");
	var checkBox3 = document.getElementById("cekBok3");
	var checkBox4 = document.getElementById("cekBok4");

	var fixedCb = ['', '', '', ''];

	if (checkBox.checked) {
		var cb = document.getElementById("cekBok1").value;
		fixedCb[0] = cb;
	}

	if (checkBox2.checked) {
		var cb2 = document.getElementById("cekBok2").value;
		fixedCb[1] = cb2;
	}

	if (checkBox3.checked) {
		var cb3 = document.getElementById("cekBok3").value;
		fixedCb[2] = cb3;
	}

	if (checkBox4.checked) {
		var cb4 = document.getElementById("cekBok4").value;
		fixedCb[3] = cb4;
	}

	return fixedCb;
}

function deleteRow() {
	var table = document.getElementById("form-table");
	table.deleteRow(currentIndex - 1);
}

function clearForm() {
	document.getElementById('fullname').value = '';
	document.getElementById('email').value = '';
	document.getElementById('address').value = '';
	$("#cekBok4").prop("checked", false);
	$("#cekBok1").prop("checked", false);
	$("#cekBok2").prop("checked", false);
	$("#cekBok3").prop("checked", false);

}

function isEmpty(str) {
	return (!str || 0 === str.length);
}

function modalUtil(obj) {
	currentIndex = obj.parentNode.parentNode.rowIndex;
	$('#modal-default').modal('show');
}

function createTableBiodata() {
	$.ajax({
		url: '/get-all',
		method: 'get',
		contentType: 'application/json',
		success: function (res, status, xhr) {
			if (xhr.status == 200 || xhr.status == 201) {
				$('#tableBiodata').DataTable({
					data: res,
					columns: [
						{
							title: "Nama",
							data: "name"
						},
						{
							title: "Email",
							data: "email"
						},
						{
							title: "Alamat",
							data: "detailModel.alamat"
						},
						{
							title: "Hobi",
							data: "detailModel.hobi"
						},
						{
							title: "Tanggal",
							data: "detailModel.tanggal"
						}
					],
					"scrollX": true
				});

			} else {

			}
		},
		error: function (err) {
			console.log(err);
		}
	});
}

function loadToCheckBox(hobbies) {
	var cekbokNum = 1;
	var hobbieIndx = 0;
	for (let index = 0; index < hobbies.length; index++) {
		if (hobbies[hobbieIndx] == document.getElementById("cekBok" + cekbokNum).value) {
			document.getElementById("cekBok" + cekbokNum).checked = true;
			console.log(hobbies[hobbieIndx]);
			

			hobbieIndx++;
			cekbokNum = 0;
		}
		cekbokNum++;
	}
}

$('#btnIsi').click(function () {
	$.ajax({
		url: '/get',
		method: 'get',
		contentType: 'application/json',
		success: function (res, status, xhr) {
			$('#fullname').val(res.name);
			$('#email').val(res.email);
			//$('#cekbok').val([res.detailModel.hobi);
			$('#address').val(res.detailModel.alamat);
			//console.log(res.detailModel.hobi);
			loadToCheckBox(res.detailModel.hobi);
		},
		erorrr: function (err) {
			console.log(err);
		}
	});
})

$(document).ready(function () {
	createTableBiodata()
	Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000
	});
});
