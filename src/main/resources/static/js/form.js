var Toast;
var count;
var currentIndex;
var kotaKabId;
var editObj;

var tableBiodata = {
	create: function () {
		// jika table tersebut datatable, maka clear and dostroy
		if ($.fn.DataTable.isDataTable('#tableBiodata')) {
			//table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
			$('#tableBiodata').DataTable().clear();
			$('#tableBiodata').DataTable().destroy();
		}

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
								title: "Kota/Kabupaten",
								data: "kota"
							},
							{
								title: "Provinsi",
								data: "nmProvinsi"
							},
							{
								title: "Action",
								data: null,
								render: function (data, type, row) {
									return '<button type="button" class="btn btn-danger" onClick="formBiodata.deleteForm(' + data.id + ')">Delete</button> <button type="button" class="btn btn-success" id="btnEdit" onClick="formBiodata.loadToForm(' + data.id + ')">Edit</button>';
								}
							}
						],
						"scrollX": true
					});
				}
			},
			error: function (err) {
				console.log(err);
			}
		});
	}
};

var formBiodata = {

	resetForm: function () {
		$('#form-home')[0].reset();
	},

	saveForm: function () {
		if ($('#form-home').parsley().validate()) {
			var kotaDetail = {
				idKota: $("#selectID option:selected").attr('id'),
				idProvinsi: $("#provinsiSelect option:selected").attr('id')
				//kota: $('#selectID').find(":selected").text()
			}

			var provinsiDetail = {
				id: $("#provinsiSelect option:selected").attr('id')
			}

			var homeModel = {
				name: document.getElementById('fullname').value,
				email: document.getElementById('email').value,
				kota: kotaDetail,
				provinsi: provinsiDetail
			}
			console.log(JSON.stringify(homeModel));

			$.ajax({
				url: '/save',
				method: 'POST',
				contentType: 'application/json',
				dataType: 'json',
				data: JSON.stringify(homeModel),
				success: function (res, status, xhr) {
					if (xhr.status == 200 || xhr.status == 201) {
						tableBiodata.create();
						clearForm();
					}
				},
				error: function (err) {
					console.log(err);
				}
			});
		}
	},

	deleteForm: function (id) {
		console.log(id);
		$.ajax({
			url: '/api/' + id,
			type: 'DELETE',
			success: function (result) {
				tableBiodata.create();
			},
			error: function (xhr, status, error) {
				console.log(xhr.responseText);
			}
		});
	},

	loadToForm: function (id) {
		formBiodata.resetForm();

		$.ajax({
			url: '/api/' + id,
			method: 'GET',
			contentType: 'application/json',
			dataType: 'json',
			success: function (res, status, xhr) {
				if (xhr.status == 200 || xhr.status == 201) {
					var obj = res;
					$('#form-home').parsley().reset();
					$('#id').val(obj.id);
					$('#email').val(obj.email);
					$('#fullname').val(obj.name);
					$('#email').val(obj.email);
					console.log(obj.idKota);

					populateCombo.getAllKota(obj.idProvinsi, obj.idKota);

				}
			},
			error: function (err) {
				console.log(err);
			}
		});
	}
}

var updateForm = {
	editForm: function () {
		var homeDetail = {
			id: $("#selectID option:selected").attr('id'),
			kota: $('#selectID').find(":selected").text()
		}

		var homeModel = {
			id: parseInt(document.getElementById('id').value),
			name: document.getElementById('fullname').value,
			email: document.getElementById('email').value,
			detailModel: homeDetail
		}
		console.log(homeModel);

		$.ajax({
			url: '/api/' + homeDetail.id,
			method: 'PUT',
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify(homeModel),
			success: function (res, status, xhr) {
				if (xhr.status == 200 || xhr.status == 201) {
					tableBiodata.create();
					clearForm();
				} else {

				}
			},
			error: function (err) {
				console.log(err);
			}
		});
	}
}

var populateCombo = {
	getAllKota: function (idProvinsi, idKota) {
		$.ajax({
			url: '/kota/' + idProvinsi,
			method: 'get',
			contentType: 'application/json',
			success: function (res, status, xhr) {
				//console.log(res);
				var dynamicSelect = document.getElementById("selectID");
				$('#selectID').find('option').remove();
				var firstOption = document.createElement("option");
				firstOption.setAttribute("id", 0);
				firstOption.text = "-- Pilih Kota / Kabupaten --";//item.whateverProperty
				dynamicSelect.add(firstOption);

				$('#outerDiv').find('div').remove();
				var cardColor = ["info", "success", "warning", "danger"];
				var i = 0;

				res.forEach(element => {
					//console.log(element)
					var newOption = document.createElement("option");
					newOption.setAttribute("id", element.idKota);
					newOption.text = element.kota;//item.whateverProperty
					dynamicSelect.add(newOption);

					if (i >= cardColor.length) {
						i = 0;
					} else {
						createShopCard(element.kota, cardColor[i]);
						i++;
					}

				});

				if (idKota > 0) {
					$("#selectID option[id=" + idKota + "]").attr("selected", "selected");
					$("#provinsiSelect option[id=" + idProvinsi + "]").attr("selected", "selected");
				}
			},
			error: function (xhr) {
				console.log(JSON.parse(xhr.responseText));
			}
		});
	},

	getAllProvinsi: function () {
		$.ajax({
			url: '/provinsi/all',
			method: 'get',
			contentType: 'application/json',
			success: function (res, status, xhr) {
				//console.log(res);
				var dynamicSelect = document.getElementById("provinsiSelect");
				res.forEach(element => {
					//console.log(element)
					var newOption = document.createElement("option");
					newOption.setAttribute("id", element.id);
					newOption.text = element.nmProvinsi;//item.whateverProperty
					dynamicSelect.add(newOption);
				});
			},
			error: function (err) {
				console.log(err);
			}
		});
	}
}

$('#provinsiSelect').change(function () {
	var idProv = $("#provinsiSelect option:selected").attr('id');
	populateCombo.getAllKota(idProv, 0);
});

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
		row.insertCell(4).innerHTML = '<td><button onclick="modalUtil(this)" type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button></tr>';

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

$('#btnIsi').click(function () {
	$.ajax({
		url: '/get',
		method: 'get',
		contentType: 'application/json',
		success: function (res, status, xhr) {
			$('#fullname').val(res.name);
			$('#email').val(res.email);
			$('#address').val(res.detailModel.alamat);
			loadToCheckBox(res.detailModel.hobi);
		},
		error: function (err) {
			console.log(err);
		}
	});
})


$('#btn-save').click(function () {
	$('#form-home').parsley();
	var id = document.getElementById("id").value;
	if (id > 0) {
		updateForm.editForm();
	} else {
		formBiodata.saveForm();
	}
})

// $(function () {
// 	$('#btn-save').parsley().on('field:validated', function () {
// 		var ok = $('.parsley-error').length === 0;
// 		$('.bs-callout-info').toggleClass('hidden', !ok);
// 		$('.bs-callout-warning').toggleClass('hidden', ok);
// 	})
// 		.on('form:submit', function () {
// 			var id = document.getElementById("id").value;
// 			if (id > 0) {
// 				updateForm.editForm();
// 			} else {
// 				formBiodata.saveForm();
// 			}
// 		});
// });

function deleteRow() {
	var table = document.getElementById("form-table");
	table.deleteRow(currentIndex - 1);
}


function clearForm() {
	formBiodata.resetForm();
	$('#form-home').parsley().reset();
	document.getElementById('id').value = 0;
	document.getElementById('fullname').value = '';
	document.getElementById('email').value = '';
	$('#selectID').prop('selectedIndex', 0);
	$('#provinsiSelect').prop('selectedIndex', 0);
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
	$('#modal-info').modal('show');
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

function deleteRow() {
	console.log('clicked');
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

function createShopCard(namaKota, btnColor) {

	var colDiv = document.createElement('div');
	colDiv.className = 'col-lg-3 col-6';

	var smallBoxDiv = document.createElement('div');
	smallBoxDiv.className = 'small-box bg-' + btnColor;

	var iconDiv = document.createElement('div');
	iconDiv.className = 'icon';

	var icon = document.createElement('i');
	icon.className = 'fas fa-shopping-cart';

	var inner = document.createElement('div');
	inner.className = 'inner';

	var innerH3 = document.createElement('h3');
	innerH3.textContent = "Kota";

	var innerP = document.createElement('p');
	innerP.textContent = namaKota;

	var footer = document.createElement('a');
	footer.className = 'small-box-footer';
	footer.textContent = 'More Info ';

	var footerBtn = document.createElement('i');
	footerBtn.className = 'fas fa-arrow-circle-right';
	footer.appendChild(footerBtn);

	inner.appendChild(innerH3);
	inner.appendChild(innerP);

	smallBoxDiv.appendChild(iconDiv).appendChild(icon);
	smallBoxDiv.appendChild(inner)
	smallBoxDiv.appendChild(footer);
	document.getElementById("outerDiv").appendChild(colDiv).appendChild(smallBoxDiv);
}

function format(item) {
	return item.name;
}

$('#mySelect2').on('select2:select', function (e) {
	var idProv = $("#mySelect2").val();
	console.log(idProv);
	populateCombo.getAllKota(idProv, 0);
});

$(document).ready(function () {
	tableBiodata.create();
	populateCombo.getAllProvinsi();
	//$('#mySelect2').select2();
	//createShopCard();

	$('#mySelect2').select2({
		placeholder: "-- Search Provinsi --",
		allowClear: true,
		minimumInputLength: 1,
		width: 'resolve',
		delay: 250,
		ajax: {
			url: '/provinsi/search',
			type: 'get',
			dataType: 'json',
			formatSelection: function (item) {
				return item.ItemText
			},
			data: function (params) {

				var queryParameters = {
					term: params.term
				}
				return queryParameters;
			},
			processResults: function (data) {
				return {
					results: $.map(data, function (item) {
						return {
							text: item.nmProvinsi,
							id: item.id
						}
					})
				};
			}
		},
		cache: true,
		formatResult: format,
		formatSelection: format

	});

	Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000
	});
});
