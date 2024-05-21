$(document).ready(function() {
    $('#travel-form').on('submit', function(e) {
        e.preventDefault();
        const country = $('#country').val();
        const duration = $('#duration').val();
        const groupSize = $('#group-size').val();
        const requestData = {
            country: country,
            duration: duration,
            groupSize: groupSize
        };
        $.ajax({
            url: '/get_recommendations',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestData),
            success: function(response) {
                // Parse the response and generate HTML table
                const recommendations = response.recommendations;
                const days = recommendations.split('Day').slice(1).map(day => {
                    const [dayNum, ...activities] = day.trim().split('\n').map(activity => activity.trim());
                    return { day: `Day ${dayNum}`, activities };
                });
                const tableRows = days.map(day => `
                    <tr>
                        <td>${day.day}</td>
                        <td>${day.activities.join('</td><td>')}</td>
                    </tr>
                `).join('');
                const tableHTML = `
                    <table>
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Activities</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                `;
                // Display the HTML table in #recommendations div
                $('#recommendations').html(tableHTML);
            },
            error: function(error) {
                console.error('Error:', error);
                $('#recommendations').html('<p>Error fetching recommendations. Please try again later.</p>');
            }
        });
    });
});
